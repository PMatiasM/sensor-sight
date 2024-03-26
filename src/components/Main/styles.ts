import styled from "styled-components";

export const Container = styled.div`
  width: 80%;
  height: 100%;
  padding: 0.7rem;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  background-color: #2a2a2a;
  border-radius: 10px;
  padding: 1rem;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 50%;
  background-color: aliceblue;
  border-radius: 10px;
`;

export const Options = styled.div`
  width: 100%;
  height: 7%;
  display: flex;
  align-items: center;
  margin-top: 1rem;
  padding: 5px;
  border: 1px solid rgba(118, 118, 118, 0.3);
  border-bottom: none;
`;

export const Option = styled.span<{ $selected?: boolean }>`
  margin: 0 5px;
  font-size: 0.7rem;
  cursor: pointer;
  color: ${(props) =>
    props.$selected ? "#ffffff" : "rgba(118, 118, 118, 0.5)"};

  &:hover {
    color: #ffffff;
  }
`;

export const Infos = styled.div`
  width: 100%;
  height: 43%;
  padding-bottom: 1rem;
`;

export const InfosWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  border: 1px solid rgba(118, 118, 118, 0.3);
  border-top: none;
`;

export const InfoBlock = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
`;

export const InfoItem = styled.div`
  color: #ffffff;
`;
