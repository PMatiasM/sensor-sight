import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 36%;
  padding-bottom: 1rem;
`;

export const Screen = styled.div`
  width: 100%;
  height: 90%;
  padding: 5px;
  resize: none;
  background-color: #2a2a2a;
  border: 1px solid rgba(118, 118, 118, 0.3);
  border-top: none;
  border-bottom: none;
  overflow: auto;

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
  border-radius: 0 0 10px 10px;
  padding: 5px;
  outline: none;
`;
