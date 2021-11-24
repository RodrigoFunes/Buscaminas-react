import React, { useState, useEffect } from 'react'
import createBoard from '../utils/createBoard';
import Cell from './Cell';
import {revealed} from '../utils/Reveal';

const Board = () => {
    const [grid, setGrid] = useState([]);
    const [nonMineCount, setNonMineCount] = useState(0);
    const [mineLocations, setMineLocations] = useState([]);

    // ComponenentDidMount
    useEffect(() => {
        // crea un nuevo board
        function freshBoard(){
            const newBoard = createBoard (10, 10, 15);
            setNonMineCount(10 * 10 - 15)
            setMineLocations(newBoard.mineLocation)
            setGrid(newBoard.board);
        }
        
        // llama a la funcion
        freshBoard();
    
    }, []);

    // on right click / flag cell
    const updateFlag = (e, x, y) => {
        // para que al presionar el click derecho no se despliegue el menu
        e.preventDefault();
        // crea una copia profunda de [grid]
        let newGrid = JSON.parse(JSON.stringify(grid));
        console.log(newGrid[x][y]);
        newGrid[x][y].flagged = true;
        setGrid(newGrid);
        
    }

    // revela la celda
    const revealCell = (x, y) => {
        if(grid[x][y].revealed){
            return;
        }

        let newGrid = JSON.parse(JSON.stringify(grid));
        if(newGrid[x][y].value === "X"){
            alert("mine found");
            for(let i=0; i<mineLocations.length; i++){
                newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
            }
            setGrid(newGrid)
        }else{
            let newRevealedBoard = revealed(newGrid, x, y, nonMineCount)
            setGrid(newRevealedBoard.arr)
            setNonMineCount(newRevealedBoard.newNonMinesCount)
        }
        
       
    }
        
   return(
       <div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center',}}>
            <p>{nonMineCount}</p>
            {grid.map((singleRow, index1) => {
            return (
                <div style= {{ display: 'flex' }} key={index1}>
                {singleRow.map((singleBlock, index2)=>{
                    return (<Cell revealCell={revealCell} details={singleBlock} updateFlag={updateFlag} key={index2} />
                    )
                })}
            </div>
            );
        })}    
            </div>
       </div>
   )   
};

export default Board;

