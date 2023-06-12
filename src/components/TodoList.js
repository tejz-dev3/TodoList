import React, { useEffect, useReducer } from 'react'
import { useState } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa';

const getLocalItems =() =>{
  const list = localStorage.getItem('lists')
  console.log(list)

  if(list){
    return JSON.parse(localStorage.getItem('lists'))
  }else{
    return []
  }
}


function TodoList() {
  const [task, setTask] = useState(getLocalItems())
  const [inputValue, setInputValue] = useState('')
  const [editTaskIndex, setEditTaskIndex]= useState(null)
  const [editInputVal, setEditInputVal] = useState('')
  
  
  // useEffect(() => {
  //   const storedTasks = localStorage.getItem('tasks');
  //   if (storedTasks) {
  //     setTask(JSON.parse(storedTasks));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('tasks', JSON.stringify(task));
  // }, [task]);


 useEffect(() => {
  localStorage.setItem('lists', JSON.stringify(task))
 }, [task])

  const AddTaskHandler = (e) =>{
   e.preventDefault()
   if(inputValue){
       const newTask = inputValue
       setTask([...task, newTask,])
       setInputValue("")
   }
  }
  
  const deletebtn =(index) => {
    const updatedTasks = [...task]
    updatedTasks.splice(index, 1)
    setTask(updatedTasks)
  }
 
 const editStartbtn = ( index, task) => {
    setEditTaskIndex(index)
    setEditInputVal(task)
 }
  
const addEditTask = (e) => {
   setEditInputVal(e.target.value)
}

const saveBtn = (index) => {
    const updatedTasks = [...task]
    updatedTasks[index] = editInputVal
    setTask(updatedTasks)
    setEditTaskIndex(null)
}

const cancelBtn = () =>{
  setEditTaskIndex(null)
}

  return (
    <div>
        <form onSubmit={AddTaskHandler} className='form-bg'>
            <h2 className='head'>Get things Done!</h2>
            <input 
            className='input-f'
            value={inputValue}
            type="text"
            placeholder='Add a Task'
            onChange={(e) => setInputValue(e.target.value)} 
            />
            <button type="submit" className='add-btn'>Add</button>
        </form>
        <ul className='form-bg1'>
            {task.map((task, index) => (
            <li key={index} className='list-todos'> 
               {editTaskIndex === index ?  (
                <input type = "text"
                className='list-todos-input'
                value={editInputVal}
                onChange={addEditTask}/>
               ):(
                task
                )}
                {editTaskIndex === index ? (
                    <>
                      <button  className="save-btn" onClick ={() => saveBtn(index)}>Save</button>
                      <button  className="save-btn" onClick ={cancelBtn}>Cancel</button>
                    </>
                ): (
                    <>
                    <button  className="edit-del-icons" onClick={ () => editStartbtn (index, task)}> <FaEdit/>  </button>
                    <button  className="del-icons" onClick={ () => deletebtn(index) }> <FaTrash/> </button>
                    </>
                )}
             </li>
        ))}
        </ul>
        
        
    </div>
  )
}

export default TodoList