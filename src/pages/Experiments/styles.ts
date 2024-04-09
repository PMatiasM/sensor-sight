import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #201c1c;
`;

export const Main = styled.div`
  width: 60%;
  height: 90%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 10px;
  background-color: #2a2a2a;
`;

export const BackButton = styled.button.attrs({ type: "button" })`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: none;
  border: 2px solid #e2b8a5;
  margin: 0.5rem 0;
  color: #e2b8a5;

  &:hover {
    background-color: #e2b8a5;
    color: #2a2a2a;
  }
`;

export const Title = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e2b8a5;
`;
