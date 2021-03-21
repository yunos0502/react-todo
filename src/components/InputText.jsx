import React from 'react';
import styled from '@emotion/styled';

const InputText = (props) => {
	const { depth, parentid = null, inputTodo, enterTodoHandler, clickTodoHandler } = props;

	return (
    <Wrap data-depth={depth} data-parentid={parentid}>
      <input
        onChange={inputTodo}
        onKeyPress={enterTodoHandler}
        placeholder="할 일을 입력해주세요 :)"
      />
      <button onClick={clickTodoHandler} />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 95%;
  display: flex;
  height: 40px;
  margin: 0.5rem auto 0;
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

export default InputText;