import { useState } from 'react';

export default function App() {
  const TodoDummyData = [
    {
      todoId: 1,
      description: "Buy",
      parentId: null,
      depth: 1
    },
    {
      todoId: 2,
      description: "Study",
      parentId: null,
      depth: 1
    },
    {
      todoId: 3,
      description: "Groceries",
      parentId: 1,
      depth: 2
    },
    {
      todoId: 4,
      description: "Outfit",
      parentId: 1,
      depth: 2
    },
    {
      todoId: 5,
      description: "React",
      parentId: 2,
      depth: 2
    },
    {
      todoId: 6,
      description: "Redux",
      parentId: 2,
      depth: 2
    },
    {
      todoId: 7,
      description: "Apples",
      parentId: 4,
      depth: 3
    },
    {
      todoId: 8,
      description: "Action",
      parentId: 6,
      depth: 3
    },
    {
      todoId: 9,
      description: "Reducer",
      parentId: 6,
      depth: 3
    }
  ];

  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState(TodoDummyData);

  const thirdDepth = todoList
    .filter((todo) => todo.depth === 3)
    .map((todo) => todo);

  const secondDepth = todoList
    .filter((todo) => todo.depth === 2)
    .map((todo) => todo);

  const Todos = todoList
    .filter((todo) => todo.depth === 1)
    .map((todo) => (
      <li key={todo.todoId}>
        {todo.description}
        <ul>
          {secondDepth
            .filter((second) => second.parentId === todo.todoId)
            .map((second) => (
              <li key={second.todoId}>
                {second.description}
                <ul>
                  {thirdDepth
                    .filter((third) => third.parentId === second.todoId)
                    .map((third) => (
                      <li key={third.todoId}>{third.description}</li>
                    ))}
                </ul>
              </li>
            ))}
        </ul>
      </li>
    ));

  const inputTodo = (e) => {
    setInputText(e.currentTarget.value);
  };

  const inputTodoHandler = (e) => {
    let depth = Number(e.target.dataset.depth);
    let parentId = Number(e.target.dataset.parentid) || null;

    setTodoList([
      ...todoList,
      {
        todoId: todoList.length + 1,
        description: inputText,
        parentId: parentId,
        depth: depth
      }
    ]);
  };

  return (
    <div className='App'>
      <h1>To-do</h1>
      <input onChange={inputTodo} />
      <button onClick={inputTodoHandler} data-depth="1">
        확인
      </button>
      <ul>{todoList.length > 0 && Todos}</ul>
    </div>
  );
}
