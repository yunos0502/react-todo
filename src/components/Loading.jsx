import React, { useState, memo, useCallback } from "react";
import styled from "@emotion/styled";

const Spinner = () => {
  return (
    <div className="Spinner SpinnerDots">
      <div className="spinner-dot" />
      <div className="spinner-dot" />
      <div className="spinner-dot" />
    </div>
  );
};

const SpinnerDotsScale = () => {
  return (
    <div className="Spinner SpinnerDotsScale">
      <div className="spinner-dot" />
      <div className="spinner-dot" />
      <div className="spinner-dot" />
    </div>
  );
};

const SpinnerCircle = () => {
  return (
    <div className="Spinner SpinnerCircle">
      <div className="spinner-dot" />
      <div className="spinner-dot" />
      <div className="spinner-dot" />
    </div>
  );
};

const spinners = [Spinner, SpinnerCircle, SpinnerDotsScale];

const Loading = memo(({ loadingStyle }) => {
  const [spinner, setSpinner] = useState(2);

  const next = useCallback(() => {
    setSpinner(spinner + 1);

    if (spinner >= spinners.length) {
      setSpinner(0);
    }

    setSpinner(spinner);
  }, [spinner]);

  const SpinnerSelected = spinners[spinner];

  return (
    <LoadingWrap style={loadingStyle}>
      <div onClick={next.bind(this)}>
        <SpinnerSelected />
      </div>
    </LoadingWrap>
  );
});

const LoadingWrap = styled.div`
  height: auto;
  display: flex;
  transition: background 500ms ease-in;
  padding: 3rem 0;
  
  & > div {
    margin: auto;
  }
  .Spinner {
    height: 29px;
    margin: auto;
    display: flex;
    opacity: 0;
    justify-content: center;
    animation-name: fadeIn;
    animation-duration: 1200ms;
    animation-fill-mode: forwards;
    &.SpinnerDots {
      .spinner-dot {
        animation-name: dance;
        animation-duration: 1000ms;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        height: 12px;
        width: 12px;
        background-color: #242429;
        margin: 3px;
        border-radius: 12px;
      }
      .spinner-dot:nth-of-type(1) {
        animation-delay: 0;
      }
      .spinner-dot:nth-of-type(2) {
        animation-delay: 333ms;
      }
      .spinner-dot:nth-of-type(3) {
        animation-delay: 666ms;
      }
    }
    &.SpinnerCircle {
      .spinner-dot {
        width: 32px;
        height: 32px;
        background: #71c1c5;
        border-radius: 50px;
        position: absolute;
        animation-duration: 3000ms;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
      }
      .spinner-dot:nth-of-type(1) {
      }
      .spinner-dot:nth-of-type(2) {
        animation-name: scaleDance;
        animation-delay: 900ms;
      }
      .spinner-dot:nth-of-type(3) {
        animation-name: scaleDance;
      }
    }
    &.SpinnerDotsScale {
      .spinner-dot {
        width: 12px;
        height: 12px;
        background: #f1b24a;
        border-radius: 50px;
        margin: 3px;
        animation-duration: 2000ms;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
      }
      .spinner-dot:nth-of-type(1) {
        animation-name: explode;
        animation-delay: 0;
      }
      .spinner-dot:nth-of-type(2) {
        animation-name: explode;
        animation-delay: 250ms;
      }
      .spinner-dot:nth-of-type(3) {
        animation-name: explode;
        animation-delay: 500ms;
      }
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes scaleDance {
    0% {
      transform: scale(1);
      opacity: 0.6;
    }
    50% {
      transform: scale(1.7434);
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes explode {
    0% {
      transform: scale(1);
      opacity: 0.4;
    }
    50% {
      transform: scale(1.25);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0.4;
    }
  }
  @keyframes dance {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(12px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export default Loading;
