import { useCallback } from 'react';

type Player = 'X' | 'O';
type Square = Player | null;
type Board = Square[];

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

const useAI = () => {
  // Check if there's a winner
  const checkWinner = useCallback((squares: Board): Player | null => {
    for (const line of WINNING_LINES) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a] as Player;
      }
    }
    return null;
  }, []);

  // Check if board is full
  const isBoardFull = useCallback((squares: Board): boolean => {
    return squares.every(square => square !== null);
  }, []);

  // Get available moves
  const getAvailableMoves = useCallback((squares: Board): number[] => {
    return squares.map((square, index) => square === null ? index : null)
                  .filter(index => index !== null) as number[];
  }, []);

  // Minimax algorithm implementation
  const minimax = useCallback((
    squares: Board, 
    depth: number, 
    isMaximizing: boolean,
    alpha: number = -Infinity,
    beta: number = Infinity
  ): number => {
    const winner = checkWinner(squares);
    
    // Terminal states
    if (winner === 'O') return 10 - depth; // AI wins (better if sooner)
    if (winner === 'X') return depth - 10; // Human wins (worse if sooner)
    if (isBoardFull(squares)) return 0; // Draw
    
    const availableMoves = getAvailableMoves(squares);
    
    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const move of availableMoves) {
        const newSquares = [...squares];
        newSquares[move] = 'O';
        const evaluation = minimax(newSquares, depth + 1, false, alpha, beta);
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of availableMoves) {
        const newSquares = [...squares];
        newSquares[move] = 'X';
        const evaluation = minimax(newSquares, depth + 1, true, alpha, beta);
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      return minEval;
    }
  }, [checkWinner, isBoardFull, getAvailableMoves]);

  // Get best move for AI
  const getBestMove = useCallback((squares: Board): number => {
    const availableMoves = getAvailableMoves(squares);
    
    if (availableMoves.length === 0) return -1;
    
    // First move optimization - take center or corner
    if (availableMoves.length === 9) {
      return 4; // Center
    }
    
    if (availableMoves.length === 8) {
      // If center is taken, take a corner
      if (squares[4] === 'X') {
        const corners = [0, 2, 6, 8];
        return corners[Math.floor(Math.random() * corners.length)];
      }
      // If corner is taken, take center
      return 4;
    }

    let bestMove = availableMoves[0];
    let bestValue = -Infinity;

    for (const move of availableMoves) {
      const newSquares = [...squares];
      newSquares[move] = 'O';
      const moveValue = minimax(newSquares, 0, false);
      
      if (moveValue > bestValue) {
        bestValue = moveValue;
        bestMove = move;
      }
    }

    return bestMove;
  }, [getAvailableMoves, minimax]);

  return {
    getBestMove,
    checkWinner,
    isBoardFull
  };
};

export default useAI;