import React, { memo } from 'react';
import styled from '@emotion/styled';

import InputText from "./InputText";
import Loading from "./Loading";

const Todos = memo((props) => {
	const {
		checkedTodos,
		todoList,
		inputTodo,
		enterTodoHandler,
		clickTodoHandler,
		loading
	} = props;

	const thirdDepth = todoList
		.filter((todo) => todo.depth === 3)
		.map((todo) => todo);

	const secondDepth = todoList
		.filter((todo) => todo.depth === 2)
		.map((todo) => todo);

	const firstDepth = todoList
		.filter((todo) => todo.depth === 1)
		.map((todo) => (
			<li key={todo.todoId} className="firstTodoItem">
				<div onClick={checkedTodos}>
					<input
						type="checkbox"
						name={todo.description + todo.todoId}
						id={todo.description + todo.todoId}
					/>
					<label htmlFor={todo.description + todo.todoId}>
						{todo.description}
					</label>
				</div>
				<InputText
					depth="2"
					parentid={todo.todoId}
					inputTodo={inputTodo}
					enterTodoHandler={enterTodoHandler}
					clickTodoHandler={clickTodoHandler}
				/>

				<ul>
					{secondDepth
						.filter((second) => second.parentId === todo.todoId)
						.map((second) => (
							<li key={second.todoId} className="secondTodoItem">
								<div onClick={checkedTodos}>
									<input
										type="checkbox"
										name={second.description + second.todoId}
										id={second.description + second.todoId}
									/>
									<label htmlFor={second.description + second.todoId}>
										{second.description}
									</label>
								</div>
								<InputText
									depth="3"
									parentid={second.todoId}
									inputTodo={inputTodo}
									enterTodoHandler={enterTodoHandler}
									clickTodoHandler={clickTodoHandler}
								/>
								<ul>
									{thirdDepth
										.filter((third) => third.parentId === second.todoId)
										.map((third) => (
											<li key={third.todoId} className="thirdTodoItem">
											<div>
													<input
														type="checkbox"
														name={third.description + third.todoId}
														id={third.description + third.todoId}
													/>
													<label htmlFor={third.description + third.todoId}>
														{third.description}
													</label>
											</div>
										</li>
									))}
								</ul>
							</li>
					))}
				</ul>
			</li>
		));

	return (
    <>
      <InputText
        depth="1"
        inputTodo={inputTodo}
        enterTodoHandler={enterTodoHandler}
        clickTodoHandler={clickTodoHandler}
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          {todoList.length > 0 ? (
            <List>{firstDepth}</List>
          ) : (
            <div className="emptyItem">등록된 할 일이 없습니다.</div>
          )}
        </>
      )}
    </>
  );
});

const List = styled.ul`
  padding: 1rem;
  width: 95%;
  margin: 1rem auto 5px;
  background-color: #ececec;
  color: #4d774e;

  .firstTodoItem {
    border: 1px solid #ececec;
    padding: 1.5rem 1rem;
    border-radius: 5px;
    box-shadow: 1px 1px 4px 0px rgb(0 0 0 / 20%);
    background-color: #fff;
    margin-top: 1rem;

    &:first-of-type {
      margin: 0;
    }
  }
  .secondTodoItem {
    padding-left: 1.5rem;
    margin-top: 1rem;

    ul {
      margin: 1rem 0;

      li {
        margin-bottom: 0.5rem;
      }
    }
    label {
      font-weight: 600;
    }
  }
  .thirdTodoItem {
    padding-left: 2rem;

    label {
      font-weight: 400;
    }
  }
  div {
    display: flex;

    label {
      position: relative;
      padding-left: 22px;
      font-weight: 800;
      line-height: 17px;

      &::before,
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
      }
      &::before {
        border: 1px solid #4d774e;
        border-radius: 3px;
        background-color: #fff;
        width: 15px;
        height: 15px;
      }
    }
    input[type="checkbox"] {
      display: none;

      &:checked + label {
        color: #4d774e82;
        text-decoration: line-through;

        &::after {
          background: url("https://icongr.am/entypo/check.svg?size=20&color=4D774E")
            no-repeat 50% / contain;
          width: 15px;
          height: 15px;
          top: 1px;
          left: 1px;
        }
      }
    }
  }
`;

export default Todos;