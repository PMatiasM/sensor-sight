import styled from "styled-components";

export const ModalContent = styled.div.attrs({ className: "modal-content" })`
  background-color: #2a2a2a;
  color: #e2b8a5;
`;

export const ModalHeader = styled.div.attrs({
  className: "modal-header",
  "data-bs-theme": "dark",
})`
  border-bottom-color: #777777;
`;

export const ModalFooter = styled.div.attrs({ className: "modal-footer" })`
  border-top-color: #777777;
`;
