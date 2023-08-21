
import React, {useState, useEffect} from 'react';
import '../styles.css';
import Square from './Square';

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isOver, setIsOver] = useState(false)
  //advantage of doing above (immutability):
  //Undo and redo can be done easily
  //minimum re-renders

  function calculateWinner(squares) {
    if (squares && squares.length > 0) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
    }
    return null;
  }

  console.log("IsOver", isOver);
  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";

    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext)
  }

  const handlePlayAgain = () => {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
    setIsOver(false)
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  useEffect(() => {
    if (calculateWinner(squares)) {
      setIsOver(true)
    }
  }, [handleClick])

  return <>
    <div className="status margin-left-40">{status}</div>
    <div className="board-row margin-left-40">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}  />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}  />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
    </div>
    <div className="board-row margin-left-40">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
    </div>
    <div className="board-row margin-left-40">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    </div>
    { isOver && <button className='btn btn-primary margin-left-40 play-again-btn' onClick={handlePlayAgain}>Play Again</button> }

  </>
}