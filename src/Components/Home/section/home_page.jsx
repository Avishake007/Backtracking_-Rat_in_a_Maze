import React, { useState } from 'react';

import Maze from './maze';

const Home_Page=()=>{
    const [intro,setIntro]=useState(true);
    const [maze,setMaze]=useState(false);

    //Function to show maze
    const show_maze=()=>{
     
        setIntro(false);
        setMaze(true); 

    }

    
   
    
    return(
        <>
        {
            (intro===true)&&
         <div className="container" id="container">
            <div className="inner_container">
                <div className="innercontain1">
                <div className="header">Backtracking</div>
                <div className="underline"></div>
              
                <div className="definition">
                    <p>What is?</p>
                    <p className="define">Backtracking can be defined as a general algorithmic technique that considers searching every possible combination in order to solve a computational problem. </p>
                </div>
                <div className="example">
                    <p>Lets understand with an example:</p>
                    <div className="problem">
                        <p>Problem: <span>Rat in a maze</span></p>
                    </div>
                    <div className="statement">
                        <p>Statement :</p>
                        <p>Given a maze of m numbers of row ,n number of columns and  knumber of obstacles you have to find whether a rat starting from position (0,0) i.e, the first  node can go to the position (m-1,n-1) .
                            You have to find the from the starting cell to the target cell (if it exists)
                        </p>
                    </div>
                    <div className="steps">
                        <p>Steps</p>
                        <p><span><i className="fas fa-circle"></i></span> Enter the number of rows and columns to create the table</p>
                        <p><span><i className="fas fa-circle"></i></span> Enter the number of obstacles</p>
                        <p><span><i className="fas fa-circle"></i></span> Click on the cells to marked them as obstacles</p>
                        <p><span><i className="fas fa-circle"></i></span> Click on "Find Path"</p>
                        <p><span><i className="fas fa-circle"></i></span> Click on "Show Path" to see the path</p>
                        <p><span><i className="fas fa-circle"></i></span> Click on "Show Code" to view the backracking code</p>

                    </div>
                </div>
                <button className="btn" onClick={show_maze}>Create Table</button>
                </div>
                <div className="innercontain2">
                    
             
                </div>
            </div>
        </div>
        }
        {    
           
            (maze===true)&&
            <Maze/>
        
        }
        </>

    )
}
export default Home_Page;