# Boundless Lab

**Live site: https://techdevgroup.github.io/boundless-lab/**

Live, modular demos of **Boundless**, a paced top-down action RPG about crossing a hostile network.
Every piece of the game appears as an interactive demo the moment it is built.

Status: 12 of 19 pieces live · 15 proven concepts · 2 prototypes · 16 ideas.

## Pieces

### Overview

- [The pitch](https://techdevgroup.github.io/boundless-lab/overview/pitch): A paced, top-down action RPG about crossing a hostile network: a silent war of weighed choices.

### Terrain generation

- [Cell shapes](https://techdevgroup.github.io/boundless-lab/terrain/cell-shapes): The atom: one Voronoi patch from a sheared lattice. Diamonds, irregular pentagons and hexagons.
- [The tile library](https://techdevgroup.github.io/boundless-lab/terrain/tile-library): Hundreds of pre-computed tiles with walls and sockets, stored as data and looked up, never recomputed.
- [Wall generators](https://techdevgroup.github.io/boundless-lab/terrain/wall-generators): Cellular automata, BSP partition and obstacle clusters, each carving solid walls out of the same cell graph.
- [Socket assembly](https://techdevgroup.github.io/boundless-lab/terrain/assembly): Gates claim slots on a shared border; a tile that offers every socket is looked up. Watch the board come together.

### The board

- [Sectors and gates](https://techdevgroup.github.io/boundless-lab/board/sectors-gates): Strict sector walls, procedural gates, solid obstacles and a sealed core. Click any cell to route to it.
- [The Network Board](https://techdevgroup.github.io/boundless-lab/board/neon-board): The same board in 3D: glass tiles, glowing walls and contoured wall masses. Click it to take the camera.

### The look

- [Palette and icon grammar](https://techdevgroup.github.io/boundless-lab/look/palette): Clearance bands from cool rim to amber core, and the shapes that carry meaning.

### Systems

- [Scan waves and masks](https://techdevgroup.github.io/boundless-lab/systems/scan-waves): A ping spreads cell by cell, walls stop it, identifiers echo back, and mask fields hide, garble or fake what is heard.
- Skills, modes and devices _(locked)_: Kinetic, hitscan and utility skills, modes that trade quiet for power, and grenades, mines and relays that reshape space.
- Risk and consequence _(locked)_: Every spend has a price. See the cost before you commit, then live with what the network learns.
- The companion _(locked)_: An AI that follows you and changes what you can know, forge, sever and mend.
- The Ledger _(locked)_: The authority keeps a cheerful, ominous record of what it thinks you did. It is not always right.
- The defenders _(locked)_: Sensors, responders and a hunt team that baseline what is normal, set traps, and harden what you used.
- The board remembers you _(locked)_: Adversaries that learn your routes and habits, and named rivals that grow a grudge.
- Sweeps _(locked)_: Scheduled pulses cross the board from the core. Read them, mask them, or sever the route.

### Making of

- [Concept catalog](https://techdevgroup.github.io/boundless-lab/making/catalog): Every design approach, who owns it, and the proof behind it.
- [The specialists](https://techdevgroup.github.io/boundless-lab/making/team): Twelve design disciplines, each with its own brief, working from one shared set of pillars.
- [Dev log](https://techdevgroup.github.io/boundless-lab/making/devlog): A running record of what shipped and why.

The full list of 33 concepts with owners and proofs is in [CATALOG.md](CATALOG.md).

> This repository is the **published build**. Source and design documents live in a private repository.
> Built from source revision `bcfd1cd` (+uncommitted changes) on 2026-10-26.
