interface GameControlsProps {
  onReset: () => void;
  onUndo: () => void;
  canUndo: boolean;
  onJumpToMove: (moveIndex: number) => void;
  moveHistory: Array<{
    squares: (string | null)[];
    player: string;
    position: number | null;
  }>;
  currentMoveIndex: number;
}

const GameControls = ({ 
  onReset, 
  onUndo, 
  canUndo, 
  onJumpToMove, 
  moveHistory, 
  currentMoveIndex 
}: GameControlsProps) => {
  const getPositionText = (position: number | null) => {
    if (position === null) return "";
    const row = Math.floor(position / 3) + 1;
    const col = (position % 3) + 1;
    return `(${row},${col})`;
  };

  return (
    <div className="space-y-6">
      <div className="game-controls">
        <button
          className="game-button primary"
          onClick={onReset}
          aria-label="Reset game"
        >
          🔄 New Game
        </button>
        <button
          className="game-button"
          onClick={onUndo}
          disabled={!canUndo}
          aria-label="Undo last move"
        >
          ↶ Undo Move
        </button>
      </div>

      {moveHistory.length > 1 && (
        <div className="move-history">
          <h3>Move History</h3>
          <div className="move-list">
            {moveHistory.map((move, index) => {
              const isCurrentMove = index === currentMoveIndex;
              const moveText = index === 0 
                ? "Game Start" 
                : `${move.player} → ${getPositionText(move.position)}`;
              
              return (
                <button
                  key={index}
                  className={`move-item ${isCurrentMove ? 'current' : ''}`}
                  onClick={() => onJumpToMove(index)}
                  aria-label={`Jump to ${moveText}`}
                >
                  {index}: {moveText}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameControls;