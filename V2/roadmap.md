**Project Roadmap**

- **Summary:**: Consolidate the game idea in [V2/INITIATION.md](V2/INITIATION.md) into an actionable plan and implement a second-version codebase, evolving the existing v1 implementations ([V1/game.js](V1/game.js) and [React/src/game/game.ts](React/src/game/game.ts)).

**High-Level Goals**
- **Playable prototype:**: Merge-board core + combat integration.
- **Modular engine:**: Separate board logic, combat resolution, map/dungeon, rendering, and audio.
- **Polish & release:**: Balance, assets, audio, packaging for web (js13k/other targets).

**Design & Enhancements (analysis + proposals)**
- **Merge rules (core):**: Keep the elegant rule-set from INITIATION: items merge to increase level; merging 2 same-level yields next level, and merging 3 of level 1 acts like a faster progression. Formalize:
  - Merge rule: level(new) = level(src)+1 when combining exactly 2 items of same level; special-case triples to yield +2 progression for L1 triple -> L3 effect but normalize for balance.
  - Represent tiles as objects: {type: 'a'|'h'|'d'|'element','level':number}
- **Action mapping:**: Attacks require an `a` + element tile adjacency or merge sequence. Use deterministic resolution: evaluate the final merged item sequence into a single action (attack/heal/defend + element tag + power).
- **Board distribution & spawn:**: Target percentages from INITIATION: attacks 30%, defend 10%, heal 10%, elements 50%. Use weighted random spawner and allow player-influence (skills) to bias.
- **Elements & combos:**: Treat elements as modifiers: element chains multiply or alter damage type. Define combination table (e.g., fire+earth = stronger physical fire; water+fire = steam with special effect).
- **Resource buffering:**: Store heal/defense as pool values; heals apply over time and are consumed per tick.
- **Skill tree:**: Implement as multiplier modifiers to merge outcomes and caps (attack multiplier, element affinity, heal cap, defense cap, scavenge).

**Architecture & Modules**
- **Board Engine (pure logic):**: grid state, merging/dropping rules, gravity, score calculation, deterministic functions with unit tests.
- **Combat Engine (rules):**: receives resolved action events from board engine and applies to actor/hp/defense/heal pools, manages mob actions and turns.
- **Map / World:**: open world map with portals (reuse `Portal` / `GameMap` concepts from [React/src/game/game.ts](React/src/game/game.ts)) and dungeon instancing for encounters.
- **Rendering Layer:**: canvas renderer (SpriteEngine) decoupled from logic; draw-only, subscribe to state changes.
- **Audio System:**: SoundSystem ported/modernized from v1.
- **Persistence & Config:**: save player progression, skill tree, unlocked dungeons, and settings.

**Implementation Roadmap (milestones)**
- **Milestone 1 — Specs & Data Models (1 week)**
  - Formalize tile types, merge rules, action resolution, element table, and skill effects.
  - Create JSON schema/types (TypeScript interfaces) for BoardTile, ActionEvent, Actor, Skill.
- **Milestone 2 — Board Engine Prototype (1–2 weeks)**
  - Implement board logic (spawn, merge detection, gravity, chain resolution) in TypeScript as pure functions with unit tests.
  - CLI or minimal HTML harness to manually test sequences.
- **Milestone 3 — Combat Resolution & Actor Models (1 week)**
  - Hook resolved actions into combat engine: damage calc (base * modifiers), defense pools, healing over time.
  - Implement simple enemy AI actions (attack/defend/heal) timed by action spans.
- **Milestone 4 — Integrate into Canvas Game (2 weeks)**
  - Connect board/combat with the canvas renderer and `Player`/`Portal` systems from [React/src/game/game.ts](React/src/game/game.ts).
  - Add interaction handlers and mobile touch support.
- **Milestone 5 — Skill Tree & Progression (1 week)**
  - Implement skill nodes (multipliers, caps), persistence of unlocked skills, and UI.
- **Milestone 6 — Content: Enemies, Dungeons, Balancing (2 weeks)**
  - Create enemy types and dungeon progression; tune spawn/level tables.
- **Milestone 7 — Art, Audio, Polish (1–2 weeks)**
  - Replace placeholders with sprites, animations, and music; finalize UI/UX polish.
- **Milestone 8 — Test, Optimize, Prepare Release (1 week)**
  - Playtesting, performance tuning, final packaging (web build, size budget for js13k if targeted).

**Technical Recommendations & Better Approaches**
- **Pure logic core:**: Keep board and combat logic pure and testable. This isolates bugs and simplifies balancing.
- **TypeScript-first:**: Use `React/src/game/game.ts` patterns — centralize types/interfaces in `src/types/` and export for both logic and renderer.
- **State events:**: Engine emits events (ActionResolved, ChainComplete, TurnTick) consumed by renderer and audio systems.
- **Unit tests:**: Use `vitest` or `jest` to test merge sequences, damage math, and persistence.
- **Data-driven balancing:**: Store spells, enemies, and level tables in JSON to iterate without code changes.
- **Performance:**: Use offscreen canvases for pre-rendered tiles and sprites; only re-draw changed regions.

**Files to review / reuse**
- Base idea: [V2/INITIATION.md](V2/INITIATION.md)
- v1 reference: [V1/game.js](V1/game.js)
- TypeScript v1 port: [React/src/game/game.ts](React/src/game/game.ts)

**Next immediate steps (what I will do if you want me to proceed)**
- 1) Create TypeScript interfaces and a test harness for the Board Engine.
- 2) Implement the Board Engine prototype with tests for merge rules and chain resolution.

**Notes on scope & risks**
- Core risk is balancing merge outcomes and combat tuning; mitigated by data-driven configs and automated tests.
- If targeting js13k, keep asset sizes and libraries extremely small; prefer programmatic visuals and procedural audio.

---

If you'd like, I'll start now by scaffolding the `src/board` module (interfaces + unit tests) and a small demo harness. Reply with which milestone to start or say "start milestone 2" to begin the board prototype.
