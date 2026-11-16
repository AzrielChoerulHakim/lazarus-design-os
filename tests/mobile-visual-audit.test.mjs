import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const cli = path.resolve(import.meta.dirname, '../scripts/mobile-visual-audit.mjs');

const fixture = collision => `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box}body{margin:0;background:#fff;color:#171717;font:16px/1.5 sans-serif}
main{width:100%;max-width:900px;margin:auto;padding:20px}
section{position:relative;min-height:200px;border:1px solid #aaa;padding:20px;margin:15px 0}
h2{width:80%;padding:8px;margin:12px 0}
figure{position:absolute;width:100px;height:100px;margin:0;background:#b79f83;right:10px;top:${collision ? '28px' : '125px'}}
</style></head><body><main><section data-lazarus-section="opening">
<h2 data-lazarus-critical="opening heading">Helpful actual evidence</h2>
<figure data-lazarus-decoration="background illustration" aria-hidden="true"></figure></section>
<section data-lazarus-section="contact"><h2 data-lazarus-critical="contact heading">Let's work together</h2></section>
</main></body></html>`;

test('geometry probe records seven viewport screenshots and explicit manual-review status', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'mobile-safe-'));
  try {
    const entry = path.join(root, 'index.html');
    fs.writeFileSync(entry, fixture(false));
    const out = path.join(root, 'screens');
    const proc = spawnSync(process.execPath, [cli, entry, '--output', out], { encoding:'utf8', timeout: 90000 });
    assert.equal(proc.status, 0, proc.stderr + proc.stdout);
    const result = JSON.parse(fs.readFileSync(path.join(out, 'audit-report.json')));
    assert.equal(result.viewports.length, 7);
    assert.ok(result.viewports.every(v => v.status === 'manual-review-required'));
    assert.equal(result.viewports.find(v => v.width === 320).sectionShots.length, 2);
    assert.ok(fs.existsSync(path.join(out, '320-section-0-opening.png')));
  } finally { fs.rmSync(root, { recursive:true, force:true }); }
});
test('geometry probe flags marked decorative collision rather than reporting false approval', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'mobile-collision-'));
  try {
    const entry = path.join(root, 'index.html');
    fs.writeFileSync(entry, fixture(true));
    const out = path.join(root, 'screens');
    const proc = spawnSync(process.execPath, [cli, entry, '--output', out], { encoding:'utf8', timeout: 90000 });
    assert.equal(proc.status, 1, proc.stderr + proc.stdout);
    const result = JSON.parse(fs.readFileSync(path.join(out, 'audit-report.json')));
    assert.ok(result.errors.some(e => e.errors.some(x => x.includes('Decorative overlap'))));
  } finally { fs.rmSync(root, { recursive:true, force:true }); }
});
