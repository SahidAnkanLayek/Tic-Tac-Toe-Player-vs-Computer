interface GameInfoProps {
  currentPlayer: string;
  winner: string | null;
  isDraw: boolean;
  moveCount: number;
  isThinking: boolean;
}

const GameInfo = ({ currentPlayer, winner, isDraw, moveCount, isThinking }: GameInfoProps) => {
  const getStatusMessage = () => {
    if (winner) {
      return winner === 'X' ? "You Win! 🎉" : "Computer Wins! 🤖";
    }
    if (isDraw) {
      return "It's a Draw! 🤝";
    }
    if (isThinking) {
      return "Computer is thinking... 🤔";
    }
    return currentPlayer === 'X' ? "Your Turn" : "Computer's Turn";
  };

  const getStatusClass = () => {
    let classes = "game-status";
    if (winner === 'X') classes += " winner";
    if (winner === 'O') classes += " draw"; // Use warning color for computer win
    if (isDraw) classes += " draw";
    return classes;
  };

  const getCurrentPlayerClass = () => {
    let classes = "current-player";
    if (currentPlayer === 'X') classes += " player-x";
    if (currentPlayer === 'O') classes += " player-o";
    if (isThinking) classes += " thinking";
    return classes;
  };

  return (
    <div className="game-info">
      <h1 className="game-title">TIC TAC TOE</h1>
      <h2 className="text-lg font-semibold mb-4 opacity-80">Player vs Computer</h2>
      <div className={getStatusClass()}>
        {getStatusMessage()}
      </div>
      {!winner && !isDraw && (
        <div className={getCurrentPlayerClass()}>
          Move #{moveCount + 1} {currentPlayer === 'X' ? '(You: X)' : '(Computer: O)'}
          {isThinking && (
            <div className="inline-block ml-2">
              <div className="animate-spin w-4 h-4 border-2 border-player-o border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameInfo;