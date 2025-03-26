import {useState} from "react";
import "./Board.css";

const calculateWinner = (squares: Array<null | number>) =>  {
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
    return null;
}

const Square = ( { value, onSquareClick }: { value: number, onSquareClick: () => void } ) => {
    return (
        <button className={"square"} onClick={onSquareClick}>
            {value}
        </button>
    );
}

const Board = () => {
    const handleClick = (i: number) => {
        if (squares[i] || calculateWinner(squares)) { return; }
        const nextSquare = squares.slice();
        if (xIsNext) {
            nextSquare[i] = "X";
        } else {
            nextSquare[i] = "O";
        }
        setSquare(nextSquare);
        setXIsNext(!xIsNext);
    }

    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquare] = useState(Array(9).fill(null));

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        if (!squares.includes(null)) {
            status = "Draw";
        }
        else {
            status = "Next player: " + (xIsNext ? "X" : "O");
        }
    }

    return (
        <>
            <div className={"statusBar"}>
                <h1>
                    {status}
                </h1>
            </div>
            <div className={"board"}>
                <div className="board-row">
                    <div className={"squareBox"}>
                        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                    </div>
                    <div className={"squareBox"}>
                        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                    </div>
                    <div className={"squareBox"}>
                        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
                    </div>
                </div>
                <div className="board-row">
                    <div className={"squareBox"}>
                        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                    </div>
                    <div className={"squareBox"}>
                        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                    </div>
                    <div className={"squareBox"}>
                        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                    </div>
                </div>
                <div className="board-row">
                    <div className={"squareBox"}>
                        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                    </div>
                    <div className={"squareBox"}>
                        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                    </div>
                    <div className={"squareBox"}>
                        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
                    </div>
                </div>
            </div>
        </>
    )
}

const Game = () => {
    return (
        <div className={"game"}>
            <Board/>
        </div>
    )
}

export default Game;
