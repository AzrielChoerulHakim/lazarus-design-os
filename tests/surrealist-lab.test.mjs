import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..', 'visual-lab/surrealist');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const html = read('index.html');
const styles = read('styles.css');
const script = read('app.js');

test('lab contains two curated, explicitly labeled concept artboards', () => {
  const ids = ['threshold', 'monograph'];
  for (const slug of ids) {
    assert.match(html, new RegExp('id="tab-' + slug + '"[^>]+role="tab"'));
    assert.match(html, new RegExp('id="panel-' + slug + '"[^>]+role="tabpanel"'));
    assert.match(html, new RegExp('data-lazarus-section="' + slug + '"'));
    assert.match(styles, new RegExp('\\.' + slug + '\\s*\\{'));
  }
  assert.equal((html.match(/role="tab" /g) || []).length, 2);
  assert.equal((html.match(/role="tabpanel"/g) || []).length, 2);
  assert.equal((html.match(/<svg\b/g) || []).length, 2);
});

test('all static IDs are unique and JavaScript references resolve', () => {
  const ids = Array.from(html.matchAll(/\bid="([^"]+)"/g), match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  const declared = new Set(ids);
  for (const match of script.matchAll(/getElementById\('([^']+)'\)/g)) {
    assert.ok(declared.has(match[1]), 'Missing referenced element: ' + match[1]);
  }
});

test('script parses, uses no network requests and does not manipulate history or scroll', () => {
  assert.doesNotThrow(() => new vm.Script(script));
  assert.doesNotMatch(script, /\bfetch\s*\(|XMLHttpRequest|localStorage|history\.|scrollTo\s*\(/);
});

test('mobile and reduced-motion composition rules are present', () => {
  assert.match(styles, /@media\(max-width:660px\)/);
  assert.match(styles, /@media\(max-width:380px\)/);
  assert.match(styles, /prefers-reduced-motion:reduce/);
  assert.match(styles, /\.threshold__art\s*\{\s*order:2;\s*position:relative/);
  assert.doesNotMatch(html, /id="panel-atlas"/);
  assert.match(styles, /\.monograph__layout\s*\{\s*display:flex;\s*flex-direction:column/);
});

test('prototype names fictional client and does not conflate art direction with voice approval', () => {
  assert.match(html, /FIKSI \/ STUDI KONSEP/);
  assert.match(html, /praktik arsitektur spekulatif fiktif/);
  assert.match(html, /tone of voice/i);
  assert.doesNotMatch(html, /fractured-muse\.svg|monograph__muse/);
  assert.doesNotMatch(html, /99%|1000\+|award-winning|satisfied clients/i);
});