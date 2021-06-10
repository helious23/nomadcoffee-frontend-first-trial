import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  accent: "#0095f6",
  bgColor: "#fafafa",
  boxBgColor: "white",
  borderColor: "rgb(219, 219, 219)",
  fontColor: "rgb(38,38,38)",
  formBgColor: "#fafafa",
  footerColor: "gray",
  appBgColor: "black",
  appFontColor: "white",
  facebookColor: "#385285",
};
export const darkTheme = {
  accent: "gray",
  fontColor: "lightgray",
  bgColor: "black",
  boxBgColor: "black",
  formBgColor: "black",
  footerColor: "white",
  appBgColor: "white",
  appFontColor: "black",
  facebookColor: "white",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    *{
        box-sizing: border-box;
    }
    body{
        background-color: ${(props) => props.theme.bgColor};
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
        color: ${(props) => props.theme.fontColor};
    }
    a{
      text-decoration: none;
      color: inherit
    }
    
`;
