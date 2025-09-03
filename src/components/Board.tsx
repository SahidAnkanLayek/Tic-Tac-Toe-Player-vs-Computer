import Square from './Square';

interface BoardProps {
  squares: (string | null)[];
  onSquareClick: (index: number) => void;
  winningLine: number[] | null;
}

const Board = ({ squares, onSquareClick, winningLine }: BoardProps) => {
  return (
    <div className="game-board">
      {squares.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onSquareClick(index)}
          isWinning={winningLine?.includes(index) || false}
        />
      ))}
    </div>
  );
};

export default Board;