import styled from "styled-components";

export const Element = styled.span<{
  $color: string;
}>`
  display: block;
  color: ${(props) => props.$color};
`;
