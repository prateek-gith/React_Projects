import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinsidhed, setshowFinsidhed] = useState(true)

  useEffect(() => {
    // it get the value from local storage with the key "todos" and json.parse ==> convert string into object
    // and when we reload the page then it dit not loss the page, it return same page with same value
    let todoString = localStorage.getItem("todos")
    if (todoString){
      let todos =JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  },[])
  
  // store from local stoage 
  const SaveToLocalStorage = ()=>{
    // JSON.stringify(todos) ==> it convert "todos" object into string in key value pair
    //("Todos",JSON.stringify() ==> this Todos is a key of the string
    //localStorage.setItem(".....",JSON.stringify(.....)) ==> it set the item inthe local storage 
    // for Exp : const person = { name: "Alex" };
    //            localStorage.setItem("user", person);
    //            console.log(localStorage.getItem("user")); // "[object Object]"; not useful!
    //            localStorage.setItem("user", JSON.stringify(person));
    //            console.log(JSON.parse(localStorage.getItem("user"))); // { name: "Alex" }

    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const ToggleFinished= ()=>{
    setshowFinsidhed(!showFinsidhed)
  }


  const handleEdit=(e,id)=>{
    let tod=todos.filter(it=>{
      return it.id===id
    })
    setTodo(tod[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    SaveToLocalStorage();
  }

  const handleDelete=(e,id)=>{
    // console.log(`1st : ${id}`)
    let newTodos=todos.filter(item=>{
      // console.log(item.id)
      // this function return the list of item whih is not Equal to The Id
      return item.id!==id
    });
    // console.log(newTodos)
    setTodos(newTodos)
    SaveToLocalStorage();
  }

  const handleAdd=()=>{
    setTodos([...todos,{id: uuidv4(), todo, iscomplete : false}])
    setTodo("")
    SaveToLocalStorage();
  }
  const handleChange=(e)=>{
    setTodo(e.target.value)
  }

  const HandleCheckBox=(e)=>{
    let id = e.target.name;
    // console.log(id)
    let index=todos.findIndex(item=>{
      // console.log(item.id)
      // it return the index number of the id which is equal to the id 
      return item.id===id
    })
    // console.log(index)
    let newTodos=[...todos];
    // console.log(`new ${!newTodos[index].iscomplete}`)
    newTodos[index].iscomplete=!newTodos[index].iscomplete
    setTodos(newTodos)
    SaveToLocalStorage()
  }


  return (
    <>
      < Navbar />
    <div className='container mx-auto my-5 rounded-xl bg-green-200 py-5 min-h-[70vh]'>
      <div className="addTodo text-lg font-bold">
        <h2> Add Your Task</h2>
        <input type="text" onChange={handleChange} value={todo} className='w-4/5 mx-14 my-5 rounded-xl'/>
        <button onClick={handleAdd} type="submit" className='bg-violet-800 hover:bg-voi950 py-1 my-2 px-2 mx-5 rounded-lg text-zinc-50' > Submit Task</button>
      </div>
      <div className='text-lg font-bold my-5 flex w-32 mx-auto justify-between'>
      <input onChange={ToggleFinished} type="checkbox" name="" id="" checked={showFinsidhed}  /> Finish Task
      </div>

      <h2 className='text-lg font-bold'>Your All task </h2>
      <div className="todos">
        {/* It Work as A If Statement
        It Mean If todos.length===0 Then Return <div> NO Todos Here </div> */}
        {todos.length ===0 && <div>No Task Here</div> }
        {todos.map(item=>{ 
          // yahi tumahre pas yadi showFinished Hai (True) To .....
          // ya fir !item.iscomplete false h to ....
        return (showFinsidhed || !item.iscomplete) && <div key={item.id} className="flex justify-between mx-5 my-3">
                    <input onChange={HandleCheckBox} type="checkbox" name={item.id} id="" checked={item.iscomplete}/>
                    <div className={item.iscomplete?"line-through":""}>{item.todo}</div>
                      <div className="button flex justify-between">
                        <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-voi950 py-1 px-2 mx-5 rounded-lg text-zinc-50 w-16 flex justify-center'><FaRegEdit /></button>
                        <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-voi950 py-1 px-2 rounded-lg text-zinc-50 w-16 flex justify-center'><AiFillDelete /></button>
                      </div>
                  </div>
          })}
      </div>
    </div>
    </>
  )
}

export default App
