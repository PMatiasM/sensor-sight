import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 43%;
  padding-bottom: 1rem;
`;

export const Screen = styled.textarea`
  width: 100%;
  height: 90%;
  padding: 5px;
  resize: none;
  background-color: #2a2a2a;
  color: #ffffff;
  border-top: none;

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

export const Input = styled.input`
  width: 100%;
  background-color: #2a2a2a;
  color: #ffffff;
  border: 1px solid rgba(118, 118, 118, 0.3);
  padding: 5px;
  outline: none;
`;
