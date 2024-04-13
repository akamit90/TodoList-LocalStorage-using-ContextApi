import { createContext, useState,useContext, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';




const ToDoContext=createContext();

const useTodoContext=() =>useContext(ToDoContext)

const getLocalItem =()=>{
    const storeItem=localStorage.getItem("list")
    return storeItem? JSON.parse(localStorage.getItem("list")):[]
}
const TodoProvider= ({children})=>{

    const [activity,setActivity] =useState("")
    const [task,setTask]=useState(getLocalItem())
    const [update,setUpdate]=useState(true)
    const [edit,setEdit]=useState(null)

    useEffect(()=>{
        localStorage.setItem("list",JSON.stringify(task))
    },[task])


    const handleUpdate =()=>{

        if(activity===""){
            alert("Please Enter Activity")
        }

        else if(!update){
            setTask(task.map((newElem)=>{
                if(newElem.id===edit){
                return{...newElem,title:activity,complete:false}
                }
                return newElem;
            }))
             setUpdate(true)
             setActivity("")
             setEdit(null)  // bcoz wps se id na jaye task update krne ke baad
        }else{
            const allActivity= {id:uuidv4(),title:activity}
            console.log(allActivity)
            setTask([...task,allActivity])
            setActivity("") 
        }
    }

    const handleRemove=(id)=>{
        const isConfirm = window.confirm("Are you sure?")
        if(isConfirm){
            
            const filterItem = task.filter((item)=>(
                id != item.id    //we are doing here just opposite of filter function here (means ki apn ek id ko hata rhe h)
            ))
            setTask(filterItem)
        }
    }

   //  // we can do same task using splice method insted of filter method

    // const handleRemove = (id) => {
    //     const newTask = [...task];
    //     newTask.splice(id, 1);           // array.splice(start, deleteCount, item1, item2, ...)
    //     setTask(newTask);
    // }
    

    const handleEdit=(id)=>{
            const findItem = task.find((elem)=>{
                return id === elem.id
            })
           setActivity(findItem.title )
           setUpdate(false)
           setEdit(id)
    }

    const handleAllRemove=()=>{
        alert("Are you sure?")
        setTask([])
    }

    const handleComplete=(id) =>{
        setTask(task.map((compItem)=>{
            if(compItem.id===id){
                return{...compItem,complete:!compItem.complete}
            }
            return compItem;
        }))

    }
    const allValue={activity,setActivity,task,setTask,update,setUpdate,edit,setEdit,handleUpdate,handleRemove,handleComplete,handleAllRemove,handleEdit}

    return (


        <ToDoContext.Provider value={allValue}>
            {children}

        </ToDoContext.Provider>

    )
}








export {ToDoContext,TodoProvider,useTodoContext}