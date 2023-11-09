import { styled } from "styled-components";

export const FlexBox = styled.div<{
  $direction?: string;
  $height?: string;
  $width?: string;
  $align?: string;
  $justify?: string;
}>`
  width: ${(props) => (props.$width ? props.$width : "100%")};
  display: flex;
  height: ${(props) => (props.$height ? props.$height : "fit-content")};
  align-items: ${(props) => (props.$align ? props.$align : "center")};
  justify-content: ${(props) => (props.$justify ? props.$justify : "center")};
  flex-direction: ${(props) => (props.$direction ? props.$direction : "row")};
  gap: 1rem;
`;
export const OverFlowDiv = styled.div<{ $direction?: string, $height?: string, $width?: string, $align?: string, $justify?: string }>`
  width: ${(props) => (props.$width ? props.$width : "100%")};
  display: flex;
  height: ${(props) => (props.$height ? props.$height : "fit-content")};
  align-items: ${(props) => (props.$align ? props.$align : "center")};
  justify-content: ${(props) => (props.$justify ? props.$justify : "center")};
  flex-direction: ${(props) => (props.$direction ? props.$direction : "row")};
  gap: 1rem;
  overflow-y: scroll;
`;

export const HiddenOnMobileDiv = styled.div`
  display: inline;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export const HiddenOnDesktopDiv = styled.div`
  display: inline;
  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

export const MeniButton = styled.button`
  width: fit-content;
  padding: 0 1rem 0 1rem;
  background: #de5555;
  height: 2rem;
  color: white;
  border: none;
  border-radius: 2rem;
  font-size: 0.95rem;

  &:hover {
    background: #bb3333;
  }
`;

export const IconButton = styled.button`
  width: fit-content;
  padding: 0.5rem;
  background: #de5555;
  height: fit-content;
  border: none;
  border-radius: 0.2rem;

  &:hover {
    background: #bb3333;
  }
`;

export const TextBox = styled.div<{ $size?: string }>`
  width: fit-content;
  text-align: center;
  color: white;
  font-size: ${(props) => (props.$size ? props.$size + "rem" : "1.5rem")};
`;

export const NovaAkcija = styled.div`
  width: 80%;
  background: #dd4444;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  & > form {
    display: grid;
    & > label {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;
export const MeniMain = styled.div`
    width: 100%;
    background: #DD4444;
    display: flex;
    height: 3rem;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem 0 1rem; 
`

export const CustomTextBox = styled.div`
    background: #DDDD44;
`
