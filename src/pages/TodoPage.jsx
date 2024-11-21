import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function TodoPage({ setIsAuthenticated }) {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const todoString = localStorage.getItem('todos');
    if (todoString) {
      const storedTodos = JSON.parse(todoString);
      if (Array.isArray(storedTodos)) {
        setTodos(storedTodos); // Set the todos state if it's a valid array
      } else {
        // If the data in localStorage is corrupted or not valid, initialize with empty array
        setTodos([]);
      }
    } else {
      // No todos in localStorage, initialize with empty array
      setTodos([]);
    }
  }, []);
  

  const saveToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  // Logout handler is defined inside the component's scope
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data
    setIsAuthenticated(false); // Set authentication state to false
    navigate('/'); // Redirect to the login page
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    const selectedTodo = todos.find((item) => item.id === id);
    if (selectedTodo) {
      setTodo(selectedTodo.todo);
      const remainingTodos = todos.filter((item) => item.id !== id);
      setTodos(remainingTodos);
      saveToLocalStorage();
    }
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));  // Save to localStorage
  };
  

  const handleAdd = () => {
    const newTodo = { id: uuidv4(), todo, isCompleted: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));  // Save to localStorage
    setTodo('');
  };
  

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
    saveToLocalStorage();
  };

  return (
    <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-6 bg-purple-200 min-h-[80vh] md:w-1/2 flex flex-col">
  <h1 className="font-bold text-center text-3xl mb-4"></h1>
  <div className="addTodo my-2 flex flex-col gap-4">
    <h2 className="text-4xl font-bold py-5 text-black-500 -mt-4">Add a Todo</h2> {/* Dark purple and larger font size */}
    <input
      onChange={handleChange}
      value={todo}
      type="text"
      className="w-full rounded-lg p-4 py-3"
      placeholder="Write your todo here..."
    />
    <button
      onClick={handleAdd}
      disabled={todo.length <= 3}
      className="bg-purple-500 hover:bg-purple-700 disabled:bg-purple-700 p-4 py-2 text-sm font-bold text-white rounded-md"
    >
      Save
    </button>
  </div>
  <input
    className="my-4"
    onChange={toggleFinished}
    type="checkbox"
    checked={showFinished}
  />
  <label className="mx-2">Show Finished</label>
  <div className="h-[1px] bg-black opacity-15 my-4"></div>
  <h2 className="text-2xl font-bold">Your Todos</h2>
  <div className="todos">
  {todos.length === 0 ? (
    <div className="flex justify-center items-center h-full text-center">
      <p className="text-small justify-center text-black-500">No Todos to display</p>
    </div>
  ) : (
    todos.map((item) => {
      return (
        (showFinished || !item.isCompleted) && (
          <div key={item.id} className="todo flex justify-between my-3">
            <div className="flex gap-6">
              <input
                name={item.id}
                onChange={() => handleCheckbox(item.id)}
                type="checkbox"
                checked={item.isCompleted}
              />
              <div className={item.isCompleted ? 'line-through' : ''}>{item.todo}</div>
            </div>
            <div className="flex h-full">
              <button
                onClick={() => handleEdit(item.id)}
                className="bg-purple-500 hover:bg-purple-700 p-4 py-2 text-sm font-bold text-white rounded-md mx-1"
              >
                <Pencil />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-purple-500 hover:bg-purple-700 p-4 py-2 text-sm font-bold text-white rounded-md mx-1"
              >
                <Trash2 />
              </button>
            </div>
          </div>
        )
      );
    })
  )}
</div>

  {/* Logout button placed at the bottom */}
  <button
    onClick={handleLogout}
    className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded-md mt-auto"
  >
    Logout
  </button>
</div>

  
  );
}

TodoPage.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default TodoPage;
