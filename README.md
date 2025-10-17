# ✨ Tic Tac Toe: Player vs Computer

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Repo Size](https://img.shields.io/github/repo-size/SahidAnkanLayek/tic-tac-toe)
![Stars](https://img.shields.io/github/stars/SahidAnkanLayek/tic-tac-toe?style=social)
![Forks](https://img.shields.io/github/forks/SahidAnkanLayek/tic-tac-toe?style=social)
![Issues](https://img.shields.io/github/issues/SahidAnkanLayek/tic-tac-toe)
![Last Commit](https://img.shields.io/github/last-commit/SahidAnkanLayek/tic-tac-toe)

A **modern, engaging Tic Tac Toe** game featuring a **smart AI opponent**, built with **React + TypeScript**.  
Challenge yourself against an **intelligent computer** with a futuristic design, glowing visuals, and smooth gameplay.

---
## 🚀 LIVE DEMO
**[▶️ Play the Game Here](https://tic-tac-toe-player-vs-computer.vercel.app)**

***

## 🚀 Features

### 🤖 AI-Powered Gameplay
- **Smart Computer Opponent** using **Minimax Algorithm + Alpha-Beta Pruning** for optimal moves.  
- Prioritizes **winning, blocking player wins, or forcing draws**.  
- **Optimized opening moves** (prefers center/corners for strategy).  
- **Variable thinking time** *(500–1500ms)* for a realistic AI feel.  

### 🎮 Player vs Computer Mode
- Player controls **X**, computer plays **O**.  
- Automatic computer response after each player turn.  
- **Smart Undo**: undoing an AI move also reverts the player’s last move.  
- Clear status updates: `"You Win!"`, `"Computer Wins!"`, `"Draw!"`.  

---

## 🕹️ Gameplay Flow
1. Player (**X**) clicks an empty square.  
2. Computer (**O**) responds after a short **thinking animation**.  
3. Game continues until a **win or draw** is detected.  
4. Features include:
   - 🔄 **Reset**  
   - ↩️ **Undo**  
   - 📜 **Move History**  

---

## 🎨 Visual Design
- **Futuristic Dark Theme** with ✨ **neon cyan (X)** and **magenta (O)**.  
- Smooth **animations** for mark placement & winning highlights.  
- **Pulsing glow** on winning lines.  
- **Responsive Layout**: works on 🖥️ Desktop, 📱 Mobile, and 📟 Tablet.  
- Typography:
  - 🎯 *Orbitron* for game elements  
  - 📝 *Inter* for UI components  

---

## 🖥️ User Experience
- 💡 *"Computer is thinking..."* indicator with animated spinner.  
- 🔔 Toast notifications for invalid moves.  
- ⏱️ Move counter & status display.  
- ♿ Accessibility with **ARIA labels** + **Keyboard Navigation**.  
- 📱 **Touch-friendly** buttons for mobile.  
- ✨ Polished with **smooth transitions & animations**.  

---

## 🛠️ Technical Implementation

**Tech Stack**  
- ⚛️ React (Hooks for state management)  
- 🟦 TypeScript (type safety)  
- 🎨 CSS with custom variables  

**Architecture**  
- 🧩 Component-based modular structure  
- 📝 Semantic design system  

**Performance**  
- ⚡ Optimized rendering & animations  

**SEO**  
- 📈 Includes proper meta tags  

---

## 🧠 AI Difficulty
The AI is designed to be **challenging**:
- ✅ Always plays optimally  
- 🚫 Blocks player winning moves  
- 🏆 Prioritizes winning  
- 🤝 Forces draws when necessary  

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/SahidAnkanLayek/tic-tac-toe.git

# Navigate to project
cd tic-tac-toe

# Install dependencies
npm install

# Start development server
npm start



🎯 Usage

Open the game in your browser.
Click an empty square ➝ place your X.
Watch the AI (O) respond after thinking.
Use:
🔄 Reset for new game
↩️ Undo to revert moves
Enjoy the futuristic design & smart AI gameplay!



🤝 Contributing

Contributions are welcome!
Please open an Issue or submit a Pull Request for features or bug fixes.



📜 License

This project is licensed under the MIT License.
