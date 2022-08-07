import Square from "./Square";

export default function Board({ squares, onclick }){
    return(
        <div className="board">
            {squares.map((square, index) => {
               return <Square onclick={onclick} value={square} index={index}/>;
            })}
        </div>
    );
}
