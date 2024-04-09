import styled from "styled-components";

export const ModalBody = styled.div.attrs({ className: "modal-body" })`
  max-height: calc(100vh - 15rem);
`;

export const Category = styled.div`
  margin: 10px 0;
`;

export const Title = styled.h2`
  font-size: 1.3rem;
`;

export const AddDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const AddButton = styled.button.attrs({ type: "button" })`
  display: flex;
  margin-top: 0.5rem;
  padding: 0;
  background: none;
  border-width: 1px;
  border-radius: 5px;
`;

export const CheckInputs = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;
