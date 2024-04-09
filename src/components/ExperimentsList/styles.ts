import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
`;

export const Toggle = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  margin-bottom: 5px;
  border-bottom: 2px solid #e2b8a5;
`;

export const Option = styled.button.attrs({ type: "button" })<{
  $selected: boolean;
}>`
  background: ${(props) => (props.$selected ? "#e2b8a5" : "none")};
  border: 2px solid #e2b8a5;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  margin-right: 5px;
  color: ${(props) => (props.$selected ? "#2a2a2a" : "#e2b8a5")};

  &:hover {
    background-color: #e2b8a5;
    color: #2a2a2a;
  }
`;

export const List = styled.div`
  width: 100%;
  height: 90%;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

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

export const Item = styled.button.attrs({ type: "button" })`
  width: calc(50% - 10px);
  height: 30%;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  border: 2px solid #e2b8a5;
  background: none;
  text-align: start;
  color: #e2b8a5;

  &:hover {
    background-color: #e2b8a5;
    color: #2a2a2a;
  }
`;

export const ItemTitle = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ItemInfos = styled.div`
  width: 100%;
  display: flex;

  div {
    width: 50%;

    p {
      margin: 0;
    }
  }
`;

export const ItemIcon = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const AddButton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContextMenu = styled.menu<{
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

export const ContextMenuItem = styled.button.attrs({ type: "button" })<{
  $delete?: boolean;
}>`
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

export const ContextMenuDivider = styled.div`
  width: 100%;
  border-top: 0.25px solid #e2b8a5;
`;
