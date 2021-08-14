import React, { useRef, useState } from "react";
import "./App.css";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITodo {
  name: string;
  done: boolean;
}
const withoutBorderStyle = {
  border: 'none'
}

function App(): JSX.Element {
  const inputTodoRef = useRef<HTMLInputElement>(null);
  const [todo, setTodo] = useState<string>("");
  const [todosArray, setTodosArray] = useState<ITodo[]>([]);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTodo(todo);
    setTodo("");
    console.log(todosArray);
  };

  const addTodo = (newTodo: string) => {
    const newState: ITodo[] = [...todosArray, { name: newTodo, done: false }];
    setTodosArray(newState);
    inputTodoRef.current?.focus();
  };

  const toggleTodo = (i: number): void => {
   const newTodoState: ITodo[] = [...todosArray];
   newTodoState.map((currentTodo: ITodo, idx: number) => {
     if (i === idx) currentTodo.done = !currentTodo.done; 
   });
   setTodosArray(newTodoState)
  }

  const removeTodo = (i: number): void => {
    const newTodoState: ITodo[] = [...todosArray];
    newTodoState.splice(i,1);
    setTodosArray(newTodoState);
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  ref={inputTodoRef}
                  autoFocus
                  className="form-control"
                  value={todo}
                  placeholder="Enter a todo..."
                  onChange={(e) => setTodo(e.target.value)}
                />
                <button className="btn btn-success btn-block mt-2 withoutBorderStyle" style={{width: '290px', border: 'none'}}>Save</button>
              </form>
            </div>
          </div>

          {todosArray.map((todoItem: ITodo, i: number) => (
            <div className="card card-body mt-2" key={i}>
              <h6 style={{textDecoration: todoItem.done ? 'line-through' : ''}}>{todoItem.name} </h6>

              <button 
              onClick={() => {toggleTodo(i)}} 
              style={withoutBorderStyle} 
              className="btn btn-light btn-block mt-2">{todoItem.done ? 'Complete' : 'Uncomplete'}</button>
              
              <button 
              onClick={() => {removeTodo(i)}} 
              style={withoutBorderStyle} 
              className="btn btn-danger btn-block mt-2">Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
