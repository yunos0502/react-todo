import { useState, useEffect, useCallback } from "react";

import Layout from "./components/Layout";
import Todos from './components/Todos';
import "./style.css";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const inputTodo = useCallback((e) => {
    setInputText(e.currentTarget.value);
  }, []);

  const todoHandler = useCallback((e) => {
    let target = e.target.parentNode;
    let depth = Number(target.dataset.depth);
    let parentId = Number(target.dataset.parentid) || null;

    if (!inputText) {
      alert("할 일을 입력해주세요");
      return false;
    }

    setTodoList([
      ...todoList,
      {
        todoId: todoList.length + 1,
        description: inputText,
        parentId: parentId,
        depth: depth,
      },
    ]);

    setInputText('');
    target.firstChild.value = '';
  }, [inputText, todoList]);

  const enterTodoHandler = useCallback((e) => {
    if (e.key !== "Enter") return;

    todoHandler(e);
  }, [todoHandler]);

  const clickTodoHandler = useCallback((e) => {
    todoHandler(e);
  }, [todoHandler]);

  const checkedTodos = useCallback((e) => {
    e.preventDefault();
    
    const standardChecked = e.target.parentNode.parentNode.querySelector('input[type="checkbox"').checked;
    const selectTodoList = e.target.parentNode.parentNode.querySelectorAll('input[type="checkbox"');

    Object.values(selectTodoList).map(item => item.checked = !standardChecked);
  }, []);

  return (
    <div className="App">
      <Layout>
        <h1>To-do List</h1>
        <Todos 
          checkedTodos={checkedTodos} 
          todoList={todoList} 
          inputTodo={inputTodo}
          enterTodoHandler={enterTodoHandler}
          clickTodoHandler={clickTodoHandler}
          loading={loading}
        />
      </Layout>
    </div>
  );
};

export default App;
