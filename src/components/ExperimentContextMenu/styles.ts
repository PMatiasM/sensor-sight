import styled from "styled-components";

export const Menu = styled.menu<{
  $opened: boolean;
  $top: number | null;
  $left: number | null;
}>`
  position: absolute;
  display: ${(props) => (props.$opened ? "flex" : "none")};
  flex-direction: column;
  border: 2px solid #e2b8a5;
  border-radius: 5px;
  background-color: #2a2a2a;
  top: ${(props) =>
    props.$opened && props.$top ? `${props.$top}px` : "initial"};
  left: ${(props) =>
    props.$opened && props.$left ? `${props.$left}px` : "initial"};
  padding: 0;
`;

export const MenuBody = styled.div``;

export const MenuItem = styled.button.attrs({ type: "button" })<{
  $delete?: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #e2b8a5;
  padding: 5px 10px;

  &:hover {
    background-color: ${(props) => (props.$delete ? `#dc3545` : "#e2b8a5")};
    color: ${(props) => (props.$delete ? `#ffffff` : "#2a2a2a")};
  }

  span {
    padding: 0 5px;
  }
`;

export const MenuDivider = styled.div`
  width: 100%;
  border-top: 0.25px solid #e2b8a5;
`;
