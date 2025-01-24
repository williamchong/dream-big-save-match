# **Game Design Document: "Girl Match Dash"**

## **Game Overview**

### **Game Title**

**Girl Match Dash**

### **Game Genre**

2D Action Adventure with Roguelike Elements

### **Platform**

HTML5 (Playable in browsers)

### **Game Description**

_Girl Match Dash_ is a game about a matchstick that falls into the ocean and must ascend to the surface while protecting itself from water and debris. The match summons three little girls, each carrying unique dreams that form protective bubbles around it. The player must guide the matchstick up through hazardous waters by controlling its movement, avoiding obstacles, and balancing upgrades to the matchstick and the bubbles. Decisions made between levels and randomized events introduce roguelike gameplay elements and shape the outcome of the journey.

The game emphasizes themes of protection, balance, and the nurturing of dreams, challenging players to make balanced, empathetic choices.

---

## **Core Gameplay**

### **Gameplay Loop**

1. **Start a Level**:

   - The player controls the matchstick using arrow keys or the mouse.
   - The matchstick automatically rises upward at a speed determined by its current level and upgrades.

2. **Navigate Hazards**:

   - Avoid obstacles like rocks or underwater debris.
   - Use the bubble shield to block unavoidable hazards.
   - Collect items (e.g., glowing orbs) to gain experience for upgrades.

3. **End of Level**:

   - Reach the "next level marker" to complete the level.
   - Earn rewards and experience points.

4. **Upgrade Phase**:

   - Spend experience points to upgrade abilities.
   - Encounter randomized events that present choices affecting future gameplay.

5. **Repeat**:
   - Advance through progressively harder levels, with increasing obstacles and challenges.

---

## **Game Objectives**

### **Primary Goal**

Guide the matchstick safely to the ocean’s surface while protecting the little girls’ dreams (represented by bubbles) and managing the balance between the matchstick’s abilities and the bubbles' strength.

### **Secondary Goals**

- Collect as many items as possible to maximize upgrades.
- Make balanced, thoughtful upgrade choices to ensure long-term survival.
- Explore the story through randomized events and decisions between levels.

---

## **Game Features**

### **Core Mechanics**

1. **Matchstick Movement**

   - The matchstick rises automatically.
   - Players control horizontal movement with the arrow keys or mouse.

2. **Bubble Shield**

   - The bubbles protect the matchstick from hazards.
   - Shields have a limited capacity based on their upgrades.
   - Shields regenerate slowly once depleted but leave the match vulnerable.

3. **Obstacles**

   - Falling debris, underwater creatures, and rocks require players to maneuver carefully.
   - Some obstacles can only be blocked by the bubble shield.

4. **Collectibles**

   - Items in the level grant experience points for upgrades.

5. **Level-Up System**

   - Players can upgrade specific attributes between levels:
     - **Shield Depth**: Increases the shield’s durability.
     - **Shield Width**: Expands the area the shield covers.
     - **Match Speed**: Increases the rate of ascent.
     - **Match Agility**: Improves the match’s responsiveness to player input.

6. **Randomized Events**
   - Between levels, players encounter events with branching choices.
   - Decisions affect future gameplay, such as granting buffs, debuffs, or additional story context.

---

## **Game Flow**

### **Start**

- A quick cutscene introduces the story of the matchstick falling into the sea and summoning the three little girls.
- Players are guided through a short tutorial level that explains controls and mechanics.

### **Levels**

- Each level is progressively more challenging, with faster ascent speeds, denser obstacles, and more complex layouts.
- Levels end when the matchstick reaches a "level marker."

### **Upgrade Phase**

- After each level, players can spend experience points to upgrade abilities.
- Randomized events are triggered, offering choices that may:
  - Boost matchstick or bubble stats.
  - Introduce additional hazards in future levels.
  - Unlock story elements.

### **Endgame**

- The final level is a culmination of the player’s decisions and upgrades.
- Players who failed to balance their upgrades may struggle to complete the game, while those who made careful, empathetic choices will find the ending more rewarding and manageable.

---

## **Art & Aesthetic**

### **Visual Style**

- **Pixel Art**: Simple but expressive, emphasizing charm and a touch of melancholy.
- **Color Palette**:
  - Deep blues and greens for the ocean.
  - Soft yellows and reds for the matchstick and the bubbles.
  - Dreamlike, glowing effects for collectibles and bubbles.

### **UI**

- Minimalistic and intuitive:
  - A small HUD showing shield health, matchstick stats, and collectible count.
  - A progress bar indicating distance to the next level marker.

---

## **Audio Design**

### **Music**

- A melancholic, ambient soundtrack to reflect the match’s struggle and the little girls’ dreams.
- Dynamic audio that intensifies as the player nears the surface.

### **Sound Effects**

- Gentle bubbling sounds for the ocean.
- Subtle "ping" sounds for collectibles.
- Crunchy impact sounds when obstacles hit the shield.
- A soft, crackling sound to represent the matchstick’s flame.

---

## **Key Design Pillars**

1. **Balance and Empathy**:

   - Players must balance upgrades between the matchstick and the bubbles, encouraging thoughtful decision-making.
   - The theme of protecting the little girls' dreams is central to the gameplay.

2. **Replayability**:

   - Randomized events and choices create a roguelike element, ensuring each playthrough feels unique.

3. **Accessibility**:

   - Simple controls and mechanics make the game easy to pick up, while the upgrade system and randomized events add depth for more experienced players.

4. **Narrative Integration**:
   - The story is told through gameplay and events, emphasizing the importance of protecting dreams and fairness.

---

## **Technical Details**

### **Engine & Tools**

- **Game Engine**: HTML5 with JavaScript (using Canvas API) or a popular framework like Phaser.
- **Art Tools**: Aseprite or similar for pixel art.
- **Audio Tools**: Audacity and free sound libraries for sound effects and music.

### **Target Audience**

- Casual players and fans of short, poignant games with a mix of action and narrative.
- Players who enjoy games with roguelike elements and upgrade systems.

---

## **Team Roles** (Example for a game jam team)

- **Game Designer & Programmer**: Implements mechanics, level design, and core gameplay.
- **Artist**: Creates pixel art assets and animations.
- **Sound Designer**: Produces music and sound effects.
- **Writer**: Develops the storyline, randomized event text, and dialogue.

---

## **Development Timeline** (For a Game Jam)

### **Day 1**:

- Finalize core mechanics.
- Implement basic movement, obstacles, and shield system.

### **Day 2**:

- Add collectibles, level progression, and upgrade systems.
- Create placeholder assets and basic UI.

### **Day 3**:

- Implement randomized events and branching choices.
- Add story cutscenes and refine visuals/audio.
- Playtest and polish.

---

## **Stretch Goals**

- Additional obstacles and mechanics (e.g., currents, enemies).
- Unlockable bubble abilities tied to specific little girls’ dreams.
- Multiple endings based on player choices.
