# Black Cat Game

A magical, fast-paced browser game where you play as a black cat on a quest to save your wizard master! Built for the JS13k 2025 competition, this project focuses on delivering a rich gameplay experience in a tiny footprint using only JavaScript, HTML, and CSS.

---

## 🐾 Game Overview

- **You are the Familiar:** Take control of a black cat, explore a vibrant emoji-based world, and battle monsters through elemental spellcasting.
- **Rescue Your Master:** Portals have appeared, monsters roam, and your wizard master is lost in another dimension. It's your mission to rescue them!
- **Unique Combat:** Master spell combos by drawing sequences on a puzzle grid, unleashing attacks or effects using elements like fire, water, and more.
- **Emoji Art & Procedural Maps:** The game world, objects, and characters are rendered with emojis and programmatic art for maximum charm and efficiency.

---

## 🚀 What Makes This Game Special?

- **Size-optimized for JS13k:** All gameplay, art, sound, and logic fit in a single compressed JavaScript file under 13 kilobytes.
- **No External Libraries:** 100% vanilla JavaScript, HTML, and CSS (plus a tiny GIF sprite sheet).
- **Procedural Everything:** Levels, dungeons, and even sound/music are generated on the fly.
- **Touch & Mobile Friendly:** Designed to work on both desktop and mobile, with virtual controls and intuitive input.
- **Synthesized Audio:** Music and sound effects are generated in real-time using JavaScript, not pre-recorded files.
- **Emoji Graphics:** Sprites and map tiles use emojis, making the visuals fun and lightweight.

---

## 🧩 Main Game Components

### 1. **Map & World**
- **GameMap & DungeonMap classes** generate and render the overworld and dungeon levels.
- **Portals, buildings, and obstacles** are placed procedurally; emoji sprites represent all objects.

### 2. **Player & Movement**
- **Player and Cat classes** handle the black cat's stats, animation, and movement.
- **Pathfinder class** enables intelligent movement on the grid-based map.

### 3. **Combat System**
- **CombatScene class** creates a spellcasting puzzle-battle.
- **Match patterns on a grid** to cast spells from the SPELLBOOK (elemental combos).
- **Elementals and Spells**: Master unique sequences for attack and defense.

### 4. **Audio Engine**
- **SoundSystem & CPlayer classes** synthesize music and sound effects using code.
- **No audio files required** — all sound is generated at runtime.

### 5. **Rendering & Utilities**
- **SpriteEngine class**: Cuts and manages sprites from the main GIF.
- **G class**: Utility toolkit for drawing, color, DOM, and math helpers.

### 6. **Game Engine & UI**
- **GameEnginge (GameEngine) & Game classes**: Manage states, menus, and the main game loop.
- **Intro, menu, and overlay scenes** for onboarding and navigation.
- **Touch controls and responsive layout** for all devices.

---

## 📝 Code Structure (in brief)

- **game.js** – All game logic, classes, rendering, and audio synthesis.
- **index.php / index.html** – Loads the game and links assets.
- **style.css** – Styles for layout, menus, and UI.
- **sh1.gif** – The game’s single sprite sheet.
- *(Plan for modularization in future versions for maintainability.)*

---

## ⚡ Getting Started

1. **Clone or Download:**  
   `git clone https://github.com/mhmdjawad/blackcatgame.git`
2. **Open index.php or index.html in your browser.**
3. **Play!** Use touch or mouse to move, explore, and fight.

---

## 🤝 Contributing

- **Pull requests and suggestions welcome!**
- Please add clear commit messages and test your changes.
- See [TODOs in game.js](game.js) for possible improvements and ideas.

---

## 📄 License

*Currently not licensed. Please contact [mhmdjawad](mailto:mohammad0jawad@gmail.com) for usage or contribution questions.*

---

## 💡 Credits & Inspiration

- Created by mhmdjawad for JS13k 2025.
- Find more updates and info at [pdemia.com/bcg](https://pdemia.com/bcg).