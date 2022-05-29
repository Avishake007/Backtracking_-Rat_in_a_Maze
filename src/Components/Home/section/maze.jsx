import React, { useEffect, useState } from 'react';
import { typing } from '../svg/coder';
import Coder from '../svg/coder';
import Footer from './footer';
import { ToastContainer, toast } from 'react-toastify';
import { pathfinder , pathfinder2} from '../functions/backtracking';
import 'react-toastify/dist/ReactToastify.css';
import Code from './code';
import $ from 'jquery';
const Maze=()=>{
    const [row,setRow]=useState(0);
    const [col,setCol]=useState(0);
    const [obstacles,setObstacles]=useState(false);
    const [coordInputs,setCoorInputs]=useState(true);
    const [findPath,setFindPath]=useState(false);
    const [showPath,setShowPath]=useState(false);
    const [noOfObs,setNoOfObs]=useState(0);
    //Table Creation
    function table_creation(row,col){
        var table=document.getElementById('table');

        //Calculating the height and width of each cell in a table
        var heightrow=35/row;
        var widthcol=35/col;
    
        //Dynamic table creation
        for(var i=0;i<row;i++){
            var div=document.createElement('div');
            div.classList.add('rows');
            table.appendChild(div);
            document.getElementsByClassName('rows')[i].style.height=`${heightrow}vw`;
            for(var j=0;j<col;j++){
                var div2=document.createElement('div');
                div2.classList.add('cols');
                div2.setAttribute('id',`col${i*col+j}`);
                div.appendChild(div2);
                document.getElementsByClassName('cols')[(i*col)+j].style.height=`${heightrow}vw`;
                document.getElementsByClassName('cols')[(i*col)+j].style.width=`${widthcol}vw`;
        }
    }
}


    function form_maze(){
       

            //Storing the number of rows and columns in row and col respectively
            var temp_row=document.getElementById('x-coord').value;
            var temp_col=document.getElementById('y-coord').value;
            
            //Validations
            if(temp_row===""||temp_col==="")
            toast.error("Please enter the number of rows and columns",{
                position: "top-center",

            });
            else if(parseInt(temp_row)<=0||parseInt(temp_col)<=0)
            toast.error("Number of rows and columns must be greater than 0",{
                position:"top-center",
            });

            else if(parseInt(temp_row)>25||parseInt(temp_col)>25){
                toast.error("Number of rows and columns must be less than equal to 25",{
                    position:"top-center",
                });
            }
            else{
                var writepad2=document.getElementById("writepad2");
                writepad2.innerHTML="";
                typing("","Enter the no of obstacles and Press 'Submit'",0);

                //Converting string to int
                temp_row=parseInt(temp_row);
                temp_col=parseInt(temp_col);
                setRow(temp_row);
                setCol(temp_col)
                //Displaying the table and number of obstacles while hidding yhe coorInputs
                setCoorInputs(false)
                document.getElementById('table').style.display="block";
                setObstacles(true)
               document.getElementById("obsxy").style.display="none";
               document.getElementsByClassName('secondpart')[0].style.display="flex";
                table_creation(temp_row,temp_col);
            }
        }

              

    
    const next_obs=(index,obstacle_left)=>{
        if(index===0||index===(row*col)-1)
        toast.error("This cell cannot be marked as obstacle. Try other cell",{
            position: "top-center"
        });
        else{
        if(obstacle_left>=0){
        document.getElementsByClassName('cols')[index].style.background="#d10707";
        if(obstacle_left===0){
            var writepad2=document.getElementById("writepad2");
                    writepad2.innerHTML="";
        typing("","Click on 'Find Path' to start scanning",0);
        setFindPath(true)
        
        //Disabling the clickable property of cells once obstacle left returns to zero
        for(var cell=0;cell<row*col;cell++){
            $(`#col${cell}`).off('click');
            document.getElementsByClassName('cols')[cell].style.cursor="none";
       
            }
        }
        get_obs(obstacle_left,index);
        }
    }
}
   
    //Converting each cell into clickable pointers
    const get_obs=(no_of_obstacles,index)=>{
        no_of_obstacles=no_of_obstacles-1;
        setNoOfObs(no_of_obstacles+1);
        for(var i=0;i<row*col;i++){
            document.getElementsByClassName('cols')[i].style.cursor="pointer";
            document.getElementsByClassName('cols')[i].innerHTML=`${i}`;
            $(`#col${i}`).on('click',function(){
                next_obs(parseInt(this.innerHTML),no_of_obstacles);
            });
        }
    }


    //Getting the x and y coords 
    const make_clickable_cell=()=>{
        let noofobs=document.getElementById('noofobs').value;

        //Validations
        if(noofobs==="")
        toast.error("Please enter the number of obstacles",{
            position:"top-center"
        });
            else if(parseInt(noofobs)<=0)
            toast.error("Number of obstacles must be greater than 0",{
                position:"top-center"
            });
        else if(noofobs>((row*col)-2))
        toast.error(`No of obstacles must be <=${(row*col)-2}`,{
            position:"top-center"
        })


        else{
            var writepad2=document.getElementById("writepad2");
        writepad2.innerHTML="";
        typing("","Click on the cells to mark them as obstacle",0);
            noofobs=parseInt(noofobs);
        document.getElementsByClassName('no_of_obs')[0].style.display="none";
        document.getElementsByClassName('obsxy')[0].style.display="flex";
        setNoOfObs(noofobs);
        get_obs(noofobs,0);
        }
    }
    function zeros(dimensions) {
        var array = [];
    
        for (var i = 0; i < dimensions[0]; ++i) {
            array.push(dimensions.length === 1 ? 0 : zeros(dimensions.slice(1)));
        }
    
        return array;
    }

    //Shows the path from the start to target if available
    const show_path=(x,y,pathstr,i,n)=>{
        if(i===n)
        return;
        var v=parseInt(col*x+y);
        document.getElementsByClassName('cols')[v].style.background="green";
        if(pathstr.key[i]==='D')
        {
        setTimeout(show_path,2000,x+1,y,pathstr,i+1,n);
        }
        else if(pathstr.key[i]==='L')
        {
        setTimeout(show_path,2000,x,y-1,pathstr,i+1,n);
        }
        else if(pathstr.key[i]==='U')
        {
        setTimeout(show_path,2000,x-1,y,pathstr,i+1,n);
        }
        else{
        setTimeout(show_path,2000,x,y+1,pathstr,i+1,n);
        }
    }


    //Checking whether a solution existed or not
    const  find_path=()=>{ 
      
            document.getElementById("obsxy").style.display="none";
            var  t=document.getElementsByClassName('cols')[0];
            t.style.background="white";
            t.innerHTML="S";
        
            var target_point_x=parseInt(row)-1;
            var target_point_y=parseInt(col)-1;
            var v=col*target_point_x+target_point_y;
            // console.log(v);
            document.getElementsByClassName('cols')[v].style.background="blue";
            document.getElementsByClassName('cols')[v].innerHTML="<i className='fas fa-flag'></i>"
           
            var arr=zeros([row,col]);
            var sol=zeros([row,col]);
            for(var i=0;i<row*col;i++){
                if(document.getElementsByClassName('cols')[i].style.background==="rgb(209, 7, 7)")
                {
                arr[parseInt(i/col)][parseInt(i%col)]=-1;
                // console.log("pp");
                }
            }
            let pathstr={key:'value'};
            pathfinder(arr,sol,0,0,target_point_x,target_point_y,row,col,"",pathstr);
            sol=zeros([row,col]);
            pathfinder2(arr,sol,0,0,target_point_x,target_point_y,row,col,"",pathstr);
        
            document.querySelector('#findbtn').style.display="none";
            var btn=document.createElement('botton');
            const maze=document.getElementsByClassName('secondpart')[0];
            btn.classList.add('btn');
            btn.setAttribute('id','showpath');
            var textnode = document.createTextNode("Show path");
            btn.appendChild(textnode);
           
            // console.log(showpath);
            maze.appendChild(btn);
            var showpath=document.getElementById("showpath");
            var x=0;
            var y=0;
          
            v=col*target_point_x+target_point_y;
            // console.log(v);
            // document.getElementById("codebtn").style.display="flex";
            if(pathstr.key!=="value"){
                var writepad2=document.getElementById("writepad2");
                writepad2.innerHTML="";
                typing("","Click on 'Show Path' once the scanning gets over",0);
                showpath.addEventListener('click',function(){
                    show_path(x,y,pathstr,0,pathstr.key.length);
                    document.getElementsByClassName('cols')[v].style.background="blue";
                    setShowPath(true);
                    document.getElementById("showpath").style.display="none";
                    var writepad2=document.getElementById("writepad2");
                    writepad2.innerHTML="";
                    typing("","Solution existed 😊",0);
                    toast.success("Solution existed 😊",{
                        position:"top-center"
                    })
                });
                
               
     
        }
        else{
            document.getElementsByClassName('cols')[v].style.background="blue";
                    document.getElementById("showpath").style.display="none";
                   
                    writepad2=document.getElementById("writepad2");
                    writepad2.innerHTML="";
                    typing("","No Solution existed 😔",0);
                    toast.error("No Solution existed 😔",{
                        position:"top-center"
                    })
        }
    
    }
    
    useEffect(()=>{
        typing("","Enter the no of rows and cols and Press 'Form maze'",0);
    },[])
    return (
        <>
            <div className="maze" id="maze" >
                <div className="coder2">
                   <Coder/>
                  </div>
                  {
                (coordInputs===true)&&<div className="coordInputs">
                    <input type="number" id="x-coord" placeholder="Enter the no of rows"/>
                    <input type="number" name="y coord" id="y-coord" placeholder="Enter the no of columns"/>
                    <button className="btn" onClick={form_maze}>Form Maze</button>
                    <ToastContainer/>
                </div>
                }
                <div className="secondpart">
                    <div className="table" id="table">
                   
                    </div>

                {
                
                (obstacles===true)&&<div className="no_of_obs">
                    <input type="number" name="noofobs" id="noofobs" placeholder="Enter no of obstacles" />
                    <button className="btn" type="submit" onClick={make_clickable_cell}>Submit</button>
                    <ToastContainer/>
                </div>
                }
                
                <div className="obsxy" id="obsxy"> 
                    <p style={{color:'yellow'}}>Number of obstacles left marking :  {noOfObs}</p>
                </div>
                {
                (findPath===true)&&<button className="btn" id="findbtn" onClick={find_path}>Find path</button>
                
                }
                <ToastContainer/>
                {
               (showPath===true)&&<Code/>
                }
               
               </div>
               
        </div>
        <Footer/>
        </>
    )        }
export default Maze;