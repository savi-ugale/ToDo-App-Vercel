import { useEffect, useState } from 'react'
import { Navbar } from './Components/Navbar'
import { Pencil } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';     //generates unique IDs. These IDs are used to uniquely identify each todo item.

function App() {

  const [todo, setTodo] = useState("")   //todo and setTodo: Manage the state of the current todo item being edited or created.
  const [todos, setTodos] = useState([]) //todos and setTodos: Manage the state of the list of all todo items
  const [showFinished, setshowFinished]= useState(true)


  useEffect(() =>{
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)

    }

  },[])

  const saveToLocalStorage = () => {

    localStorage.setItem("todos", JSON.stringify(todos))
    
  }     //This function saves the current todos state to localStorage as a string. This ensures that the list of todos persists even when the page is refreshed.
  

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  const handleEdit= (e, id)=>{ 
    let t= todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
   setTodos(newTodos)
   saveToLocalStorage()
  }

  const handleDelete= (e, id)=>{ 
    const isConfirmed = window.confirm("Are you sure you want to delete this todo?");
  
    if (isConfirmed) {
      let newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
      saveToLocalStorage(); 
    } 
    
  }

  const handleAdd= ()=>{
    setTodos([...todos,{id: uuidv4(),todo, isCompleted: false}])
    setTodo("")
    saveToLocalStorage()
    
  }

  
  const handleChange= (e)=>{
    setTodo(e.target.value)
    
  } 

  const handleCheckbox=(e) => {
   let id = e.target.name;

   let index = todos.findIndex(item=>{
     return item.id === id;
   })
   console.log(index)
   let newTodos = [...todos];
   newTodos[index].isCompleted = !newTodos[index].isCompleted;
   setTodos(newTodos)
   saveToLocalStorage()
  }
  
  

  return (
    <>
    <Navbar/>
      <div className='mx-3 md:container md:mx-auto my-5 rounded-xl p-6 bg-purple-200 min-h-[80vh] md:w-1/2' >
      <h1 className='font-bold text-center text-3xl '>iTask - Manage your todos at one place</h1>
       <div className="addTodo my-5 flex flex-col gap-4">
        <h2 className='text-3xl font-bold py-5 '>Add a Todo</h2>
        <input  onChange={handleChange} value={todo} type='text ' className='w-full rounded-lg p-4 py-3' placeholder='Write your todo here...' /> 
        <button onClick={handleAdd} disabled={todo.length<=3} className='bg-purple-500 hover:bg-purple-700  disabled:bg-purple-700 p-4 py-2 text-sm font-bold text-white rounded-md '>Save</button>
       </div>
       <input className='my-4'onChange={toggleFinished} type="checkbox" checked={showFinished}/> 
       <label className='mx-2' htmlFor="show">Show Finished</label>
       <div className='h-[1px] bg-black opacity-15  my-4'></div>
          <h2 className='text-2xl  font-bold'>Your Todos</h2>
          <div className="todos">
          {todos.length ===0 && <div className='m-5'>No Todos to display</div>}
           {todos.map(item=>{

        
           return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
            <div className='flex gap-6'>
            <input name={item.id} onChange={handleCheckbox}type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
              <div className=" flex h-full">
                <button onClick={(e)=>handleEdit(e, item.id)} className='bg-purple-500 hover:bg-purple-700 p-4 py-2 text-sm font-bold text-white rounded-md mx-1'><Pencil /></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-purple-500 hover:bg-purple-700 p-4 py-2 text-sm font-bold text-white rounded-md mx-1'><Trash2 /></button>

              </div>

            </div>
            })}
          </div>
          
      </div>
    </>
  )
}

export default App
