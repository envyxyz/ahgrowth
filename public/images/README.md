# Image assets

`hero/`, `editorial/`, `blobs/` and `texture/` are currently **seeded with
copies of the service plates** so the homepage renders correctly before the
real imagery exists.

Replace them in place using `ANTIGRAVITY-IMAGES.md` at the repo root. It lists
the exact path, dimensions and generation prompt for each of the 8 files. The
code already points at these paths, so overwriting a file is the entire
wiring step. Do not rename anything.

`services/` holds the real generated service card art. Do not overwrite those.
