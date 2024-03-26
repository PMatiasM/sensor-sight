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
  justify-content: space-evenly;
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

export const List = styled.div`
  width: 100%;
  max-height: 80%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const ListItem = styled.a.attrs({ download: "data.csv" })`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  background: none;
  border: 2px solid #e2b8a5;
  margin: 0.5rem 0;
  padding: 0.5rem;
  color: #e2b8a5;
  text-decoration: none;
  cursor: pointer;

  span {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: #e2b8a5;
    color: #2a2a2a;
  }
`;
