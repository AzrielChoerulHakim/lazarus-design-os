# 05 / MØDE
**Study classification:** narrative · editorial media · interaction finishing.

**Historical source:** `noir-editorial-ui.zip` containing a self-contained HTML/CSS/JS editorial landing example, poster and small MP4. Not republished here. Historical types: Instrument Serif and Inter.

## What the source demonstrates
A real `video` element uses an explicit poster image, muted/inline playback and static media fallback. One animation-frame-coalesced scroll handler maintains header state and reading progress rather than giving each component its own listener.

The menu state is explicit: opened/closed is tied to `aria-expanded`, navigation, Escape and viewport changes. A content detail overlay supports focus management, Escape closing, and focus returning to the invoking control. Native `<dialog>` may reduce future custom focus-trap complexity.

The lesson is **finishing interactions** rather than displaying a modal in a screenshot.

## Transferable mechanism
An editorial contrast between text and imagery is useful when the client has genuine work to show. Video deserves a place only when it reveals the work more effectively than a still. The amount of motion and the type pairing must be justified by the content.

## Do not reproduce
The original demo's case descriptions, glass treatment, time-based word shuffling, particular serif/sans pairing or borrowed media as client evidence. A professional portfolio may need no video.

## QA
Poster fallback, page with video unavailable, small screens, keyboard focus and return, Escape, body scroll handling, hover-independent activation, reduced-motion preference, licensed assets and authentic client material.
