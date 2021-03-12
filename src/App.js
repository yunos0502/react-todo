import { useRef, useState } from 'react';

const TodoDummyData = [
  {
    oneDepthId: 1,
    oneDepthTitle: 'Buy',
    twoDepth: [
      {
        twoDepthId: 1,
        twoDepthTitle: 'Groceries',
        threeDepth: [],
      },
      {
        twoDepthId: 2,
        twoDepthTitle: 'Outfit',
        threeDepth: [
          {
            threeDepthId: 1,
            threeDepthTitle: 'Apples',
          },
        ],
      },
    ],
  },
  {
    oneDepthId: 2,
    oneDepthTitle: 'Study',
    twoDepth: [
      {
        twoDepthId: 1,
        twoDepthTitle: 'React',
      },
      {
        twoDepthId: 2,
        twoDepthTitle: 'Redux',
        threeDepth: [
          {
            threeDepthId: 1,
            threeDepthTitle: 'Action',
          },
          {
            threeDepthId: 2,
            threeDepthTitle: 'Reducer',
          },
        ],
      },
    ],
  },
];

export default function App() {
  const [FirstText, setFirstText] = useState('');
  const [SecondText, setSecondText] = useState('');
  const [ThirdText, setThirdText] = useState('');
  const [Todos, setTodos] = useState(TodoDummyData);
  const firstInput = useRef(null);

  const changeFirstText = (e) => {
    setFirstText(e.currentTarget.value);
  };
  const changeSecondText = (e) => {
    setSecondText(e.currentTarget.value);
  };

  const changeThirdText = (e) => {
    setThirdText(e.currentTarget.value);
  };

  const addFirstTodo = () => {
    if (!FirstText) {
      alert('텍스트를 입력해주세요');
      firstInput.current.focus();
      return false;
    }
    setTodos([
      ...Todos,
      { oneDepthId: Todos.length + 1, oneDepthTitle: FirstText },
    ]);
  };

  const addSecondTodo = (e) => {};

  const addThirdTodo = () => {};

  const TodoList = () => {
    return Todos.map((firstData) => {
      console.log(firstData);

      return (
        <li key={firstData?.oneDepthId} data-id={firstData?.oneDepthId}>
          {firstData?.oneDepthTitle}
          <input onChange={changeSecondText} />
          <button onClick={addSecondTodo}>확인</button>
          <ul>
            {firstData?.twoDepth?.map((secondData) => {
              return (
                <li key={secondData?.twoDepthId}>
                  {secondData?.twoDepthTitle}
                  <input onChange={changeThirdText} />
                  <button onClick={addThirdTodo}>확인</button>
                  <ul>
                    {secondData?.threeDepth?.length > 0 &&
                      secondData?.threeDepth.map((thirdData) => (
                        <li key={thirdData?.threeDepthId}>
                          {thirdData?.threeDepthTitle}
                        </li>
                      ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </li>
      );
    });
  };

  return (
    <div className='App'>
      <h1>To-do</h1>
      <div>
        <input onChange={changeFirstText} ref={firstInput} />
        <button onClick={addFirstTodo}>확인</button>
      </div>
      <ul>{TodoList()}</ul>
    </div>
  );
}
