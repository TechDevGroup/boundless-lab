# Concept catalog

_Generated from `src/lab/concepts.js` by `npm run catalog`. Do not edit by hand._

**15 proven · 2 prototype · 16 idea** across 12 specialist owners.

A concept is *proven* only with a passing test or a live Lab piece.

| Status | Concept | Owner | What it is | Proof |
|---|---|---|---|---|
| proven | **Atomized Voronoi patches** | Terrain generation | The terrain is built from small reusable Voronoi patches (the atom), never one global diagram. | [live](https://techdevgroup.github.io/boundless-lab/terrain/cell-shapes)<br>test: test/mapgen.test.js: tile cells are a mix of diamonds and irregular 5-6 gons |
| proven | **Sheared lattice for cell shape** | Terrain generation | Shearing a square lattice toward a triangular one tunes the mix from diamonds to hexagons. | [live](https://techdevgroup.github.io/boundless-lab/terrain/cell-shapes) |
| proven | **Pre-computed tile library** | Terrain generation | 240 tiles built once from a seed and stored as JSON; rebuilt automatically when the generator code changes. | [live](https://techdevgroup.github.io/boundless-lab/terrain/tile-library)<br>test: test/mapgen.test.js: the checked-in tile library is up to date |
| proven | **Socket-matched assembly** | Terrain generation | Gates claim slots on a shared border; a tile is looked up that offers every required socket. Wang-tile style. | [live](https://techdevgroup.github.io/boundless-lab/terrain/assembly)<br>test: test/mapgen.test.js: every gate joins two open cells whose borders line up |
| proven | **Memoised candidate lookup** | Terrain generation | Tile candidates are cached by (recipe, required sockets), so repeat assembly does no new work. | [live](https://techdevgroup.github.io/boundless-lab/terrain/assembly)<br>test: test/mapgen.test.js: assembly is a pure lookup |
| proven | **Cellular-automata caves** | Terrain generation | Neighbour-majority smoothing on the cell graph produces organic wall masses. | [live](https://techdevgroup.github.io/boundless-lab/terrain/wall-generators) |
| proven | **BSP space-partition rooms** | Terrain generation | Recursive splits make rooms; cells near interior splits become wall; extra doors open loops. | [live](https://techdevgroup.github.io/boundless-lab/terrain/wall-generators) |
| proven | **Blue-noise obstacle clusters** | Terrain generation | Spread-out cluster centres with distance falloff give islands and pillar fields. | [live](https://techdevgroup.github.io/boundless-lab/terrain/wall-generators) |
| proven | **Carve-to-connect path overlay** | Terrain generation | Whatever a generator does, the cheapest chain of wall cells is opened so open space is always one region. | [live](https://techdevgroup.github.io/boundless-lab/terrain/wall-generators)<br>test: test/mapgen.test.js: every tile is internally connected |
| proven | **Sector graph with a sealed core** | Level design | A random spanning tree plus loops joins the sectors; the core is reachable only through a locked gate. | [live](https://techdevgroup.github.io/boundless-lab/board/sectors-gates)<br>test: test/mapgen.test.js: all sectors are reachable from the start |
| proven | **Clearance bands** | Level design | Concentric bands from rim to core steer which tile recipes a sector may use. | [live](https://techdevgroup.github.io/boundless-lab/look/palette) |
| proven | **Cell-graph routing** | Mechanics | Shortest routes over open cells, blocked by solid walls and locked gates. | [live](https://techdevgroup.github.io/boundless-lab/board/sectors-gates) |
| proven | **Network wall contours** | Art direction | Solid masses are dark extrusions whose crest glows where they meet open floor. | [live](https://techdevgroup.github.io/boundless-lab/board/neon-board) |
| proven | **Embedded camera that never steals the page** | Interaction | In a scrolling page the 3D view only takes wheel and keys after you click into it. | [live](https://techdevgroup.github.io/boundless-lab/board/neon-board) |
| proven | **Hot-reload development beat** | Design director | Localhost reloads on every edit and rebuilds the tile library when generator code changes; the public Lab is republished each change. | test: npm run dev (see docs/DEV_LOOP.md) |
| prototype | **Sight-radius fog preview** | Interaction | Cells re-tint by distance from the player; the real fog system is not built yet. | [live](https://techdevgroup.github.io/boundless-lab/board/neon-board) |
| prototype | **Icon grammar** | Items and icons | Shape carries meaning, colour is semantic, everything reads in monochrome. | [live](https://techdevgroup.github.io/boundless-lab/look/palette) |
| idea | **Skills, modes and weapons** | Mechanics | Kinetic, hitscan and utility skills; modes that trade quiet for power; melee, projectile and kinetic weapons. | _not built yet_ |
| idea | **Radius devices** | Mechanics | Grenades, mines, relays and shields with limited charges: placed devices persist and shape the space. | _not built yet_ |
| idea | **Exposure and risk previews** | Mechanics | What the network knows about you rises with noise and sight lines; every spend previews its cost before you commit. | _not built yet_ |
| idea | **Focus slow-down and dual controls** | Interaction | Point-and-click or WASD with mouse aim, plus a held Focus that slows time to weigh a choice. | _not built yet_ |
| idea | **Companion doctrines and directives** | Mechanics | An AI follower with switchable doctrines and aimed directives: annotate, forge, sever, mend. | _not built yet_ |
| idea | **Intrusion stages as mission structure** | Missions | Recon, entry, foothold, pivot, persistence, objective and egress give every run a readable arc. | _not built yet_ |
| idea | **The defenders as an operation** | Nemesis | Sensors, responders, analysts and a hunt team baseline what is normal, set honeypots, and harden what you used. | _not built yet_ |
| idea | **Defensive and purple missions** | Missions | Hold an enclave against an intruder, or learn the other side; what you did as the intruder becomes their playbook. | _not built yet_ |
| idea | **Scan waves over the cell graph** | Mechanics | A ping or sweep spreads outward cell by cell, confined by solid walls, building and then exhausting over time. | _not built yet_ |
| idea | **Echo returns from identifiers** | Mechanics | Anything that identifies itself (you, devices, decoys, adversaries) re-emits a wave that travels back the same way. | _not built yet_ |
| idea | **Masked stealth fields** | Mechanics | A cast field that absorbs, scrambles or spoofs any scan crossing it, giving cover with a cost, a duration and a tell. | _not built yet_ |
| idea | **The Ledger** | Paranoia | The authority’s cheerful, ominous record of what it thinks you did; it can be wrong. | _not built yet_ |
| idea | **The board remembers you** | Nemesis | Adversaries learn routes and habits; surviving rivals gain names and grudges. | _not built yet_ |
| idea | **Sweeps** | Nemesis | Scheduled pulses cross the board from the core; read them, mask them, or sever the route. | _not built yet_ |
| idea | **Faction territories from cluster partitions** | Factions | Reuse the cluster and BSP partitioners to seed rival territories and borders. | _not built yet_ |
| idea | **Missions as generation recipes** | Missions | A mission is recipe weights plus required sockets plus objectives, assembled from the library. | _not built yet_ |
