import React from "react";
import styled, { keyframes } from "styled-components";
import PreloaderSvg from "./PreloaderSvg.svg";
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

const PreloaderImg = styled.img`
  animation: ${rotate} 1s linear infinite;
  width: 50%;
  height: 50%;
`;

const Preloader = () => {
  return (
    <PreloaderContainer>
      <PreloaderImg src={PreloaderSvg} />
    </PreloaderContainer>
  );
};

export default Preloader;
