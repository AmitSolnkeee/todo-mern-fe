import './App.css';
import React, { useEffect , useState } from 'react';
import {BsFillPlusSquareFill} from 'react-icons/bs';
import axios from 'axios';

const style = {
  strikeOff : {
      textDecoration : "line-through"
  }
}


function App() {

  const API_URL="https://todo-mern-india.herokuapp.com"

  const [newTodo, setNewTodo] = useState("");
  const [ todos, setTodos] = useState([]);
  const [newOption , setNewOption] = useState('all');
  const [refresh, setRefresh] = useState("")
  
  useEffect(()=>{
    fetch(`${API_URL}/api/todo`).then(res=>res.json()).then(data=> setTodos(data))
    
  },[refresh])

  //add handler
  const addTodoHandler = async() => { 

    //API Add todo
    await axios.post(`${API_URL}/api/todo`, {
      todoList :newTodo
    }).then(response =>setTodos([...todos , response.data]));
    setNewTodo('');
     
  }


  //delete handler
  const deleteTodoHandler = async(id) => { 
    await axios.delete(`${API_URL}/api/todo/${id}`);
    setRefresh(Math.random()*1000)
    //window.location.reload();
  }

  //complete handler
  const completeTodoHandler = async(id) => { 
     await axios.put(`${API_URL}/api/todo/${id}`);
     //window.location.reload();
     setRefresh(Math.random()*1000)
  }

 /* useEffect(()=>{
    let filterCompleteData;
    if(newOption === 'completed'){
      filterCompleteData = todos?.filter(todo=> todo.completed)
    }else if(newOption === 'uncompleted'){

      filterCompleteData = todos?.filter(todo => !todo.completed)
    }else{
      filterCompleteData = todos
    }
    
  console.log(filterCompleteData)
  setTodos(filterCompleteData)
  },[newOption])*/

  //Filter Data for completed and uncompleted task
  const filterCompletedData = todos?.filter(elm=>elm.completed);
  const filterUnCompletedData = todos?.filter(elm=>!elm.completed);


  return (
    <div className="App">
      <h1>Todo List</h1>

      <div className='todo-add'>
        
        <input className='add-input' value={newTodo} onChange={(e)=>setNewTodo(e.target.value)} type='text'/>
        <span style={{height :"40px",backgroundColor:'white',borderRadius:"1px"}}onClick={addTodoHandler}><BsFillPlusSquareFill size={40} className='ici'/></span>

        <select className='option-dropdown' onChange={(e)=>{setNewOption(e.target.value)}}>
          <option defaultValue='all'>All</option>
          <option value='completed'>Completed</option>
          <option value='uncompleted'>Uncompleted</option>
        </select>
        
      </div><hr/>

      <div className='todos'>
      
      {
        newOption === 'completed' ? filterCompletedData?.map((todo,index)=>{
          return(
            <div key={index} className='todo'>
              <div className='' style={todo.completed ? style.strikeOff : {}}>{todo.todoList}
              <button className='delete-button' onClick={()=>deleteTodoHandler(todo._id)}>❌</button>
              <button  className='update-button'onClick={()=>completeTodoHandler(todo._id)}>✅</button>
              </div>
              </div>
          )
        }) : newOption === 'uncompleted' ? filterUnCompletedData?.map((todo,index)=>{
          return(
            <div key={index} className='todo'>
              <div className='' style={todo.completed ? style.strikeOff : {}}>{todo.todoList}
              <button className='delete-button' onClick={()=>deleteTodoHandler(todo._id)}>❌</button>
              <button  className='update-button'onClick={()=>completeTodoHandler(todo._id)}>✅</button>
              </div>
              </div>
          )
        }) : todos?.map((todo,index)=>{
          return(
            <div key={index} className='todo'>
              <div className='' style={todo.completed ? style.strikeOff : {}}>{todo.todoList}
              <button className='delete-button' onClick={()=>deleteTodoHandler(todo._id)}>❌</button>
              <button  className='update-button'onClick={()=>completeTodoHandler(todo._id)}>✅</button>
              </div>
              </div>
          )
        })
      }
       
        </div>
    </div>
  );
}

export default App;
