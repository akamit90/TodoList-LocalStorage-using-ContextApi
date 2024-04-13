import React, { useContext } from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { CiSquareCheck } from "react-icons/ci";
import { useTodoContext } from './ToDoContext/ToDoContext';

function TaskList() {

   const{task,handleComplete,handleRemove,handleEdit,handleAllRemove}= useTodoContext()
    

  return (
    <div>
        <ul>
      {  
        task.map((taskList)=>(
        <li 
        className={`flex justify-between border-b-2 px-2 py-1 items-center ${taskList.complete ? "line-through" : ""}`}
        key={taskList.id}
         >
            <div className='flex gap-3'>
                <span className='cursor-pointer'>
                <CiSquareCheck size={25} onClick={()=>handleComplete(taskList.id)}/>
                </span>
                <span>{taskList.title}</span>
            </div>
            <div className='flex gap-3'>
                <span className='cursor-pointer'>
                <FaEdit size={25} onClick={()=>handleEdit(taskList.id)}/>
                </span>
            <span className='cursor-pointer'>
                <MdDelete size={25} onClick={()=>handleRemove(taskList.id)}/>
                </span>
            </div>
        </li>
    ))
}
        
</ul>

{
    task.length>1 && <button className='bg-[red] text-white px-3 py-2 rounded-md my-5 hover:bg-red-600' onClick={handleAllRemove}>
    Remove all
    </button>
}
    </div>
  )
}

export default TaskList
