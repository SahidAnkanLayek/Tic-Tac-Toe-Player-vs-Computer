interface SquareProps {
  value: string | null;
  onClick: () => void;
  isWinning: boolean;
}

const Square = ({ value, onClick, isWinning }: SquareProps) => {
  const getSquareClasses = () => {
    let classes = "game-square";
    
    if (value) {
      classes += " occupied";
      if (value === 'X') {
        classes += " player-x";
      } else {
        classes += " player-o";
      }
    }
    
    if (isWinning) {
      classes += " winning";
    }
    
    return classes;
  };

  return (
    <button
      className={getSquareClasses()}
      onClick={onClick}
      disabled={!!value}
      aria-label={value ? `Square filled with ${value}` : "Empty square"}
    >
      {value}
    </button>
  );
};

export default Square;