import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function App() {
  // Retrieve todoList from session storage on initial load
  const initialTodoList = JSON.parse(sessionStorage.getItem('todoList')) || [];

  // State for the input field to add new todos
  const [todo, setTodo] = useState('');

  // State to store the list of todos
  const [todoList, setTodoList] = useState(initialTodoList);

  // State to handle editing a todo item
  const [editTodo, setEditTodo] = useState(null);

  // State to store the text of the todo being edited
  const [editTodoText, setEditTodoText] = useState('');

  // Function to handle form submission when adding or editing a todo
  const handleForm = (e) => {
    e.preventDefault();

    // If editTodo is not null, update an existing todo
    if (editTodo !== null) {
      const updatedTodoList = todoList.map((item) => {
        if (item.todoName === editTodo) {
          return { ...item, todoName: editTodoText };
        }
        return item;
      });
      setTodoList(updatedTodoList);
      setEditTodo(null);
      setEditTodoText('');
    } else {
      // If editTodo is null, add a new todo
      if (!todo.trim()) {
        alert('Please add a todo');
        return;
      }
      setTodoList([...todoList, { todoName: todo, completed: false }]);
    }

    // Clear the input field after adding or editing a todo
    setTodo('');
  };

  // Function to toggle the completion status of a todo
  const toggleTodoCompletion = (todoName) => {
    const updatedTodoList = todoList.map((item) => {
      if (item.todoName === todoName) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodoList(updatedTodoList);
  };

  // Function to delete a todo
  const deleteTodo = (deleteValue) => {
    const restTodoList = todoList.filter((val) => {
      return val.todoName !== deleteValue;
    });
    setTodoList(restTodoList);
  };

  // Function to edit a todo
  const editTodoTextAndSave = (editValue) => {
    setEditTodo(editValue);
    setEditTodoText(editValue);
  };

  // Use useEffect to save the todoList to session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className='bg-gray-200 w-full h-screen flex items-center px-5 my-5 pb-10 mb-10'>
      <div className='w-[600px] xxxxxl:w-[40%] xxxxl:w-[40%] xxxl:w-[50%] xxl:w-[50%] xl:w-[600px] lg:w-[600px] md:w-[600px] sm:w-[600px] xs:w-[90%] xxs:w-[95%] xxxs:w-[100%] xxxxs:w-[100%] mx-auto text-center bg-sky-950 shadow shadow-blue-500 p-5 rounded-[12px]'>
        <h1 className='text-5xl font-bold mb-8 text-sky-200 mt-5'>ToDo-<span className='header text-sky-300'>List</span></h1>
        <form onSubmit={handleForm}>
          {/* Input field for adding or editing todos */}
          <input
            className='border-2 placeholder:text-gray-500 outline-transparent rounded-lg
            border-transparent w-11/12 p-2 mb-10 text-black'
            id='form'
            type='text'
            placeholder='Tasks To Be Done...'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            type='submit'
            className='bg-sky-300 text-sky-950 text-xl py-3 px-8 rounded-lg mb-8 font-bold'>
            {editTodo !== null ? 'Save' : 'Add'}
          </button>
        </form>

        <div className='todo-display'>
          <ul>
            {/* Mapping through todoList to display each todo */}
            {todoList.map((singleTodo, index) => (
              <li
                key={index}
                className={`bg-transparent border border-sky-300 flex h-12 items-center mb-5 text-gray-100 py-5 rounded-lg
                text-xl px-2 w-[92%] m-auto justify-between truncate xs:w-[92%] sm:w-[92%] md:w-[92%] lg:w-[92%] xl:w-[92%] ${singleTodo.completed ? 'opacity-50' : ''}`}>
                  <span className='check text-sky-300 flex items-center'>
                  {/* Checkbox to mark todo as completed */}
                  <input
                    type="checkbox"
                    className='w-5 h-5 mr-1'
                    checked={singleTodo.completed}
                    onChange={() => {
                      toggleTodoCompletion(singleTodo.todoName);
                    }}
                  />
                </span>
                  <div className='w-[80%] text-left truncate'>
                {/* Edit the todo text or display it */}
                { editTodo === singleTodo.todoName ? (
                  <input
                    type='text'
                    className='text w-[100%] h-12 outline-none p-2 rounded-lg bg-transparent text-gray-100 text-xl'
                    value={editTodoText}
                    onChange={(e) => setEditTodoText(e.target.value)}
                  />
                ) : (
                  singleTodo.todoName
                )}
                </div>
                <div className='icons'>
                {/* Button to edit a todo */}
                <span
                    className={`edit text-sky-300 cursor-pointer pl-1 pr-2 ${singleTodo.completed ? 'pointer-events-none' : ''}`}
                    onClick={() => {
                      if (!singleTodo.completed) {
                        editTodoTextAndSave(singleTodo.todoName);
                      }
                    }}>
                    {editTodo === singleTodo.todoName ? '' : (<FontAwesomeIcon icon={faPenToSquare} />)}
                  </span>
                {/* Button to delete a todo */}
                <span
                  onClick={() => deleteTodo(singleTodo.todoName)}
                  className='delete text-sky-300 cursor-pointer px-0'>
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
