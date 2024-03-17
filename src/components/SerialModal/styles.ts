import styled from "styled-components";

export const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ListItem = styled.button.attrs({ type: "button" })`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  background: none;
  border: 2px solid #201c1c;
  margin: 0.5rem 0;
  color: #201c1c;

  span {
    font-size: 1.2rem;
  }

  &:hover {
    background-color: #201c1c;
    color: #ffffff;
  }

  &:disabled:hover {
    background-color: #ffffff;
    color: #201c1c;
  }
`;

export const CancelButton = styled.button.attrs({ type: "button" })`
  display: flex;
  align-items: center;
  justify-content: center;
`;
