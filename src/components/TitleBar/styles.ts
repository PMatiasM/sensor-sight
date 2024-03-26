import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 3.5vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2a2a2a;
  border-bottom: 1px solid rgba(118, 118, 118, 0.3);
  -webkit-app-region: drag;
`;

export const Logo = styled.div`
  width: 7.5%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: start;

  svg {
    width: 45%;
    height: 95%;
  }
`;

export const Title = styled.div`
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    color: #ffffff;
    font-size: small;
  }
`;

export const Controls = styled.div`
  width: 7.5%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-app-region: no-drag;
`;

export const ControlsButton = styled.button.attrs({ type: "button" })<{
  $close?: boolean;
}>`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: none;
  border: none;

  &:hover {
    background-color: ${(props) => (props.$close ? "#f01424" : "#6d6b6b")};
  }
`;
