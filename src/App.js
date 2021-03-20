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
    console.log(e.target);

    setTodoList([
      ...todoList,
      {
        todoId: todoList.length + 1,
        description: inputText,
        parentId: parentId,
        depth: depth
      }
    ]);

    setInputText('');
    e.target.previousSibling.value = '';
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
        <label htmlFor={`secondId${todo.todoId}`}>
          <input type="checkbox" name={`secondId${todo.todoId}`} id={`secondId${todo.todoId}`} />
          {todo.description}
        </label>
        <InputText>
          <input onChange={inputTodo} placeholder="할 일을 입력해주세요 :)" />
          <button onClick={inputTodoHandler} data-depth="2" data-parentid={todo.todoId} />
        </InputText>
        
        <ul>
          {secondDepth
            .filter((second) => second.parentId === todo.todoId)
            .map((second) => (
              <li key={second.todoId} className="secondTodoItem">
                <label htmlFor={`secondId${second.todoId}`}>
                  <input type="checkbox" name={`secondId${second.todoId}`} id={`secondId${second.todoId}`} />
                  {second.description}
                </label>
                <InputText>
                  <input onChange={inputTodo} placeholder="할 일을 입력해주세요 :)" />
                  <button onClick={inputTodoHandler} data-depth="3" data-parentid={second.todoId} />
                </InputText>
                <ul>
                  {thirdDepth
                    .filter((third) => third.parentId === second.todoId)
                    .map((third) => (
                      <li key={third.todoId} className="thirdTodoItem">
                        <label htmlFor={`secondId${third.todoId}`}>
                          <input type="checkbox" name={`secondId${third.todoId}`} id={`secondId${third.todoId}`} />
                          {third.description}
                        </label>
                      </li>
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
          <input onChange={inputTodo} placeholder="할 일을 입력해주세요 :)" />
          <button onClick={inputTodoHandler} data-depth="1" />
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
    width: 95%;
    margin: auto;
    text-align: center;
    font-size: 1.5rem;
    color: #202020;
  }
`;

const InputText = styled.div`
  width: 95%;
  display: flex;
  height: 40px;
  margin: 1rem auto;
  align-items: center;

  input {
    flex: 1;
    border: 0;
    background-color: #fff;
    border: 0;
    border-bottom: 1px solid #ececec;
    padding: 0 1rem;
    width: calc(100% - 40px);
    line-height: 39px;
  }
  button {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid #F1B24A;
    background: #F1B24A url('https://icongr.am/clarity/add.svg?size=128&color=FFFFFF') no-repeat 50% / 20px;
  }
`;

const List = styled.ul`
  padding: 1rem;
  width: 95%;
  margin: 0 auto 5px;
  background-color: #ececec;
  color: #4D774E;

  & > li {
    border: 1px solid #ececec;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 1px 1px 4px 0px rgb(0 0 0 / 20%);
    margin-bottom: 1rem;
    background-color: #fff;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .secondTodoItem {
    padding-left: 1rem;

    ul {
      margin-bottom: 1rem;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
  .thirdTodoItem {
    padding-left: 2rem;
  }
  label {
    position: relative;
    padding-left: 22px;

    &::before, &::after {
      content: '';
      position: absolute;
      left: 0;
    }
    &::before {
      border: 1px solid #4D774E;
      border-radius: 3px;
      background-color: #fff;
      width: 15px;
      height: 15px;
    }
    &::after {}

    input {
      display: none;
    }
  }
`;