import { useState } from 'react';

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
  const [Text, setText] = useState('');

  const changeText = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };
  const onClickButton = () => {};

  const TodoList = () => {
    return TodoDummyData.map((firstData) => {
      return (
        <li key={firstData.oneDepthId}>
          {firstData.oneDepthTitle}
          <ul>
            {firstData.twoDepth.map((secondData) => {
              return (
                <li key={secondData.twoDepthId}>
                  {secondData.twoDepthTitle}
                  <ul>
                    {secondData?.threeDepth?.length > 0 &&
                      secondData.threeDepth.map((thirdData) => (
                        <li key={thirdData.threeDepthId}>
                          {thirdData.threeDepthTitle}
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
        <input onChange={changeText} />
        <input onChange={changeText} />
        <input onChange={changeText} />
        <button onClick={onClickButton}>확인</button>
      </div>
      <ul>{TodoList()}</ul>
    </div>
  );
}
