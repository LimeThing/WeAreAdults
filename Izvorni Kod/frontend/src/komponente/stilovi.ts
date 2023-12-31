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
  h2 {
    color: #a82d2d;
    font-weight: bold;
    text-align: center;
    height: fit-content;
    align-items: center;
    font-size: 1rem;
    padding: 0 0 1rem 0;
  }
  p {
    text-align: center;
    padding: 0 1rem 0 1rem;
  } 
`;
export const OverFlowDiv = styled.div<{
  $direction?: string;
  $height?: string;
  $width?: string;
  $align?: string;
  $justify?: string;
}>`
  height: ${(props) => (props.$height ? props.$height : "fit-content")};
  width: ${(props) => (props.$width ? props.$width : "100%")};
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  /*background: linear-gradient(to left, #b63e3e, #a82d2d);*/
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
  cursor: pointer;
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
  cursor: pointer;
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
  background: #dd4444;
  display: flex;
  height: 3rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem 0 1rem;
`;

export const CustomTextBox = styled.div`
  background: #dddd44;
`;

export const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  
`;

export const Container = styled.div`
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;


  width: 800px;
  max-width: 100%;
  min-height: 520px;

  p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    margin: 20px 0;
  }

  span {
    font-size: 12px;
  }

  a {
    color: #333;
    font-size: 13px;
    text-decoration: none;
    margin: 15px 0 10px;
  }
  button {
    background-color: #ce4242;
    color: #fff;
    font-size: 12px;
    padding: 10px 45px;
    border: 1px solid white;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 10px;
    cursor: pointer;
  }

  form {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    /*padding: 0 80px;*/
    padding: 0 100px;
    height: 100%;
  }

  input {
    background-color: #eee;
    border: none;
    margin: 8px 0;
    padding: 10px 15px;
    font-size: 13px;
    border-radius: 8px;
    width: 100%;
    outline: none;
  }
`;

export const FormContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
`;

export const FormContainer2 = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
`;

export const ToggleContainer = styled.div`
  position: absolute;
  top: 0;
  right: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  border-radius: 0 150px 100px 0;
`;

export const ToggleContainer2 = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  border-radius: 150px 0 0 100px;
`;

export const Toggle = styled.div`
  background-color: #a82f2d;
  height: 100%;
  background: linear-gradient(to left, #b63e3e, #a82d2d);
  color: #fff;
  position: relative;
  height: 100%;
  width: 200%;
`;

export const Toggle2 = styled.div`
  background-color: #a82f2d;
  height: 100%;
  background: linear-gradient(to left, #b63e3e, #a82d2d);
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
`;

export const TogglePanel = styled.div<{ $right?: boolean }>`
  position: absolute;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  text-align: center;
  top: 0;
  
  right: ${(props) => (props.$right ? "0" : "")};
  transform: ${(props) => (props.$right ? "translateX(0)" : "")};
`;

export const Drakulica = styled.div`
  height: 200px;
  width: auto;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
`;

export const Name = styled.div`
  margin-bottom: 8px;
`;

export const VerifyButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const InfoStyle = styled.div`
  margin: 15px;
  h1 {
    color: #a82f2d;
  }

  .hck {
    float: right;
  }

  .nacela{
    float: right;
    height: 450px;
    width: auto;
  }

  
  .darivanjeKrvi {
    float: right;
    height 450px;
    width: 450px;
  }



  .doniranaKrv {
    height: 750px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  h2 {
    text-align: center;
  }

`;

export const Karta = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
`

export const PopupContainer = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  position: fixed;
  overflow: hidden;


  width: 350px;
  max-width: 100%;
  min-height: 100px;
  margin: 20px;
  

  p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    margin: 20px 0;
  }

  span {
    font-size: 12px;
  }

  a {
    color: #333;
    font-size: 13px;
    text-decoration: none;
    margin: 15px 0 10px;
  }
  button {
    background-color: #ce4242;
    color: #fff;
    font-size: 12px;
    padding: 10px 45px;
    border: 1px solid white;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 10px;
    cursor: pointer;
  }

  form {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    /*padding: 0 80px;*/
    padding: 0 100px;
    height: 100%;
  }

  input {
    background-color: #eee;
    border: none;
    margin: 8px 0;
    padding: 10px 15px;
    font-size: 13px;
    border-radius: 8px;
    width: 100%;
    outline: none;
  }
  
  display: flexbox;
  align-items: center;
  justify-content: center;

`;

export const LokacijeDiv = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  gap: 1rem;
  width: 100%;
  button {
    width: fit-content;
    padding: 0 1rem 0 1rem;
    background: #de5555;
    height: 2rem;
    color: white;
    border: none;
    border-radius: 2rem;
    font-size: 0.95rem;
    cursor: pointer;
  &:hover {
    background: #bb3333;
  }
  }
  @media (max-width: 1200px) {
    flex-wrap: wrap;
  }
`

export const LocationsWindow = styled.div`
  background-color: white;
  text-align: center;
  width: 11.1rem;
  padding: 0.5rem;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  p {
    padding: 0 0 0.25rem 0;
  }
`
