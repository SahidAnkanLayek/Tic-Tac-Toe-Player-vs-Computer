import { useState } from 'react';
import Board from './Board';
import GameInfo from './GameInfo';
import GameControls from './GameControls';
import Toast from './Toast';
import useTicTacToe from '../hooks/useTicTacToe';

const TicTacToe = () => {
  const {
    squares,
    currentPlayer,
    winner,
    winningLine,
    isDraw,
    moveCount,
    isThinking,
    history,
    currentMoveIndex,
    canUndo,
    makeMove,
    resetGame,
    undoMove,
    jumpToMove
  } = useTicTacToe();

  const [toast, setToast] = useState<{ message: string; type: 'error' | 'info' } | null>(null);

  const handleSquareClick = (index: number) => {
    const success = makeMove(index);
    if (!success) {
      setToast({
        message: "Invalid move! This square is already taken.",
        type: 'error'
      });
    }
  };

  const handleToastClose = () => {
    setToast(null);
  };

  return (
    <div className="game-container">
      <div className="flex flex-col items-center max-w-4xl mx-auto">
        <GameInfo
          currentPlayer={currentPlayer}
          winner={winner}
          isDraw={isDraw}
          moveCount={moveCount}
          isThinking={isThinking}
        />
        
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <Board
            squares={squares}
            onSquareClick={handleSquareClick}
            winningLine={winningLine}
          />
          
          <GameControls
            onReset={resetGame}
            onUndo={undoMove}
            canUndo={canUndo}
            onJumpToMove={jumpToMove}
            moveHistory={history}
            currentMoveIndex={currentMoveIndex}
          />
        </div>
        
        <footer className="mt-12 text-center">
          <p className="text-sm opacity-70">
            Built with React & TypeScript | Powered by Modern Web Tech
          </p>
        </footer>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleToastClose}
        />
      )}
    </div>
  );
};

export default TicTacToe;