import React,{useState} from "react";
import CodeModal from "../Code Modal/codeModal";

const Code = () => {
  
  const [open, _open] =useState(false);

  const onOpenModal=()=>{
    _open((prev)=>(prev=true));
  }

  const onCloseModal=()=>{
    _open((prev)=>(prev=false));
  }

  return (
    <>
      <button className="btn" id="codebtn" onClick={()=>onOpenModal()}>
        Show Code
      </button>
     <CodeModal open={open} onCloseModal={onCloseModal}/>
    </>
  );
};
export default Code;
