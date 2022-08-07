import Board from "./Board";
import { useState } from "react";

export default function Game(){
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState("O");
    const [gameOver, setGameOver] = useState(false);
    const [boxFilled,setBoxFilled] = useState(0);
    const [noWinners, setNoWinners] = useState(false);

    function isBoxFilled(){
        let filledBoxes = 0;
        filledBoxes = boxFilled % 9; 

        if( filledBoxes === 8)
            return true;
        else
            return false;
    }

    function calculateWinner(){
        const winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ]; 

        for(const combo of winningCombinations){
            const [a,b,c] = combo;

            if(
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ){
                return squares[a];
            }
        }
        return null;  
    }

    function handleClick(selectedIndex){
        if(squares[selectedIndex] !== null) return; 

        let squareCopy = squares;
        squareCopy[selectedIndex] = currentPlayer;
        setSquares(squareCopy);
        setBoxFilled(boxFilled + 1);

        const gameWinner = calculateWinner();
       
        if(gameWinner){
            setGameOver(true);
            setCurrentPlayer(currentPlayer);
            setBoxFilled = 0;

        }else{

            const noWinner = isBoxFilled();

            if(noWinner){
                setNoWinners(true);
                setCurrentPlayer("O");
            }else{
                if(currentPlayer == "O"){
                    setCurrentPlayer("X");
                }else{
                    setCurrentPlayer("O");
                }    
            }

        }
    }  

    function restartGame(){
        const confirmText = "Are you sure you want to restart game? ";
        if(window.confirm(confirmText)==true){
            setBoxFilled(0);
            setNoWinners(false);
            setGameOver(false);
            setSquares(Array(9).fill(null));
        }
    }

    return(
        <div>
            {(!gameOver && noWinners) && (
            <div>
                <h1 className="gameLost">It's a Draw</h1>
                <button className="resetGame" onClick={restartGame}>Reset Game</button>
            </div>)}
            {!gameOver && <h1 className="player">{currentPlayer} Turn</h1>}
            {gameOver && (
            <div>
                <h1 className="player">{currentPlayer} Won!</h1>
                <button className="newGame" onClick={restartGame}>New Game</button>
            </div>
            )}
            <Board squares={squares} onclick={handleClick} />
        </div>
    );
}
