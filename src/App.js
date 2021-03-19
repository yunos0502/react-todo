import { useState } from 'react';
import styled from '@emotion/styled';

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

  const inputTodo = (e) => {
    setInputText(e.currentTarget.value);
  };

  const inputTodoHandler = (e) => {
    let depth = Number(e.target.dataset.depth);
    let parentId = Number(e.target.dataset.parentid) || null;

    console.log(depth, parentId);

    setTodoList([
      ...todoList,
      {
        todoId: todoList.length + 1,
        description: inputText,
        parentId: parentId,
        depth: depth
      }
    ]);

    setInputText("");
  };

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
        <input onChange={inputTodo} />
        <button
          onClick={inputTodoHandler}
          data-depth="2"
          data-parentid={todo.todoId}
        >
          확인
        </button>
        <ul>
          {secondDepth
            .filter((second) => second.parentId === todo.todoId)
            .map((second) => (
              <li key={second.todoId}>
                {second.description}
                <input onChange={inputTodo} />
                <button
                  onClick={inputTodoHandler}
                  data-depth="3"
                  data-parentid={second.todoId}
                >
                  확인
                </button>
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

  return (
    <div className='App'>
      <Layout>
        <h1>Todo List</h1>
        <InputText>
          <input onChange={inputTodo} />
          <button onClick={inputTodoHandler} data-depth="1">
            확인
          </button>
        </InputText>
        <List>{todoList.length > 0 && Todos}</List>
      </Layout>
    </div>
  );
}

const Layout = styled.div`
  overflow: hidden;
  margin: 30px auto;
  padding: 0;
  width: 100%;
  max-width: 500px;

  h1 {
    text-align: center;
  }
`;

const InputText = styled.div`
  width: 95%;
  display: flex;
  height: 40px;
  background-color: #ececec;
  margin: 1rem auto;

  input {
    flex: 1;
    border: 0;
    background-color: #fff;
    border: 1px solid #ececec;
    padding: 0 1rem;
  }
  button {
    width: 20%;
    background-color: #ececec;
  }
`;

const List = styled.ul`
  border: 1px solid #ececec;
  padding: 1rem;
  /* box-shadow: 1px 1px 4px 0px rgb(0 0 0 / 20%); */
  width: 95%;
  margin: 0 auto 5px;
`;