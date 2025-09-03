import { useState, useCallback, useEffect } from 'react';
import useAI from './useAI';

type Player = 'X' | 'O';
type Square = Player | null;
type Board = Square[];

interface GameState {
  squares: Board;
  player: Player;
  position: number | null;
  isAIMove?: boolean;
}

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

const useTicTacToe = () => {
  const [history, setHistory] = useState<GameState[]>([
    { squares: Array(9).fill(null), player: 'X', position: null }
  ]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [isThinking, setIsThinking] = useState(false);

  const { getBestMove, checkWinner } = useAI();
  const currentGame = history[currentMoveIndex];
  const { squares, player } = currentGame;

  // Calculate winner and winning line
  const getWinner = useCallback((squares: Board): { winner: Player | null; line: number[] | null } => {
    for (const line of WINNING_LINES) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a] as Player, line };
      }
    }
    return { winner: null, line: null };
  }, []);

  const { winner, line: winningLine } = getWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);
  const isGameOver = winner || isDraw;

  // AI move effect
  useEffect(() => {
    if (player === 'O' && !isGameOver && currentMoveIndex === history.length - 1) {
      setIsThinking(true);
      
      // Add delay for better UX
      const timer = setTimeout(() => {
        const bestMove = getBestMove(squares);
        if (bestMove !== -1) {
          makeAIMove(bestMove);
        }
        setIsThinking(false);
      }, 500 + Math.random() * 1000); // Random delay between 500-1500ms

      return () => clearTimeout(timer);
    }
  }, [player, isGameOver, currentMoveIndex, history.length, squares, getBestMove]);

  // Make AI move
  const makeAIMove = useCallback((squareIndex: number) => {
    const newSquares = [...squares];
    newSquares[squareIndex] = 'O';
    
    const newGameState: GameState = {
      squares: newSquares,
      player: 'X',
      position: squareIndex,
      isAIMove: true
    };

    setHistory(prev => {
      const newHistory = prev.slice(0, currentMoveIndex + 1);
      newHistory.push(newGameState);
      return newHistory;
    });
    setCurrentMoveIndex(prev => prev + 1);
  }, [squares, currentMoveIndex]);

  // Make player move (human move)
  const makeMove = useCallback((squareIndex: number) => {
    if (squares[squareIndex] || isGameOver || player !== 'X' || isThinking) {
      return false; // Invalid move
    }

    const newSquares = [...squares];
    newSquares[squareIndex] = 'X';
    
    const newGameState: GameState = {
      squares: newSquares,
      player: 'O',
      position: squareIndex,
      isAIMove: false
    };

    // Remove any future history if we're not at the latest move
    const newHistory = history.slice(0, currentMoveIndex + 1);
    newHistory.push(newGameState);
    
    setHistory(newHistory);
    setCurrentMoveIndex(newHistory.length - 1);
    return true; // Valid move
  }, [squares, player, isGameOver, history, currentMoveIndex, isThinking]);

  // Reset game
  const resetGame = useCallback(() => {
    setHistory([{ squares: Array(9).fill(null), player: 'X', position: null }]);
    setCurrentMoveIndex(0);
    setIsThinking(false);
  }, []);

  // Undo move - handle AI moves
  const undoMove = useCallback(() => {
    if (currentMoveIndex > 0) {
      let newIndex = currentMoveIndex - 1;
      
      // If the last move was AI, undo both AI and player moves
      if (history[currentMoveIndex].isAIMove) {
        newIndex = Math.max(0, currentMoveIndex - 2);
      }
      
      setCurrentMoveIndex(newIndex);
      setIsThinking(false);
    }
  }, [currentMoveIndex, history]);

  // Jump to specific move
  const jumpToMove = useCallback((moveIndex: number) => {
    if (moveIndex >= 0 && moveIndex < history.length) {
      setCurrentMoveIndex(moveIndex);
      setIsThinking(false);
    }
  }, [history.length]);

  return {
    // Game state
    squares,
    currentPlayer: player,
    winner,
    winningLine,
    isDraw,
    isGameOver,
    moveCount: currentMoveIndex,
    isThinking,
    
    // History
    history,
    currentMoveIndex,
    canUndo: currentMoveIndex > 0,
    
    // Actions
    makeMove,
    resetGame,
    undoMove,
    jumpToMove
  };
};

export default useTicTacToe;
