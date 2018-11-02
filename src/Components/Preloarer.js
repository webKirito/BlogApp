import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const PreloaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreloaderImg = styled.div`
  background-color: ${props => props.color};
  animation: ${rotate} 1s linear infinite;
  width: 30%;
  height: 30px;
  margin: 30px;
`;

const PreloaderLine = styled.div`
  animation: ${rotate} 0.4s ease-in infinite;
  margin: 20px;
  display: flex;
  width: 90%;
  justify-content: center;
  align-items: center;
`;

const Preloader = () => {
  return (
    <PreloaderContainer>
      <PreloaderLine>
        <PreloaderImg color="#c158dc" />
        <PreloaderImg color="#5c007a" />
        <PreloaderImg color="#8e24aa" />
      </PreloaderLine>
    </PreloaderContainer>
  );
};

export default Preloader;
