module.exports = {
content: ["./src/**/*.{js,jsx, ts, tsx}"],
theme: {
  fontFamily: {
    inter: ["Inter", "sans-serif"],
    "edu-sa": ["Edu SA Beginner", "cursive"], 
    mono: ["Roboto Mono", "monospace"],
  } ,
  colors: {
  from : '#1FA2FF' ,
  via : '#12D8FA' ,
  to : '#A6FFCB' ,
  from1 : '#8A2BE2' ,
  via1 : '#FFA500' ,
  to1 : '#F8F8FF' ,
  from2 : 'rgba(255, 81, 47, 1)' ,
  to2: 'rgba(240, 152, 25, 1)' ,
  from3 : 'rgba(230, 92, 0, 1)' ,
  to3 : 'rgba(249, 212, 35, 1)' ,
  from4 : 'rgba(131, 58, 180, 1)' ,
  via4 : 'rgba(253, 29, 29, 1)' ,
  to4 : 'rgba(252, 176, 69, 1)' ,
  from5 : 'rgba(236, 0, 140, 1)' ,
  to5 : 'rgba(252, 103, 103, 1)' ,
  red : 'rgba(255 , 0 , 0 , 1)' ,
  delete1 : '#EE4B2B' ,
  delete : "rgba(128, 0, 0 , 0.7)" ,
  white: "#fff",
  black: "#000",
  transparent: "#ffffff00", 
  richblack: { 
    5: "#F1F2FF",
    25: "#DBDDEA",
    50: "#C5C7D4",
    100: "#AFB2BF",
    200: "# 999DAA",
    300: "#838894",
    400: "#6E727F",
    500: "#585D69",
    600: "#424854",
    700: "#2C333F",
    800: "#161D29",
    900: "#000814",
  },
  blue: {
    5: "#EAF5FF",
    25: "#84DAEC",
    50: "#7EC0D9",
    100: "#47ASCS",
    200: "#118AB2",
    300: "#0F7A9D",
    400: "#0C6A87",
    500: "#0A5A72",
    600: "#074850",
    700: "#053848",
    800: "#022B32",
    900: "#00181D",
  },
  caribbeangreen: {
    5: "#C1FFFD",
    25: "#83F1DE",
    50: "#44E4BF",
    100: "#06D6A0",
    200: "#05BF8E",
    300: "#05A77B",
    400: "#049069",
    500: "#037957",
    600: "#026144",
    700: "#014A32",
    800: "#01321F",
    900: "#001800",
  },
  richblue: {
    5: "#ECF5FF",
    25: "#C6D6E1",
    50: "#A0B7C3",
    100: "#7A98A6",
    200: "#537988",
    300: "#2D5A6A",
    400: "#073B",
    500: "#063544",
    600: "#042E3B",
    700: "#032833",
    800: "# 01212A",
    900: "#001822",
  },
  brown: {
    5: "#FFF4C4",
    25: "#FFE395",
    50: "#FFD166",
    100: "#E7BC58",
    200: "#CFA64F",
    300: "#889144",
    400: "#A87C39",
    500: "#886620",
    600: "#705122",
    700: "#593017",
    800: "#41260B",
    900: "#291100",
  },
  pink: {
    5: "#FFF1F1",
    25: "#FBC701",
    50: "#F79CB0",
    100: "#F37290",
    200: "#EF476F",
    300: "#D43063",
    400: "#BA3356",
    500: "#9F294A",
    600: "#84103E",
    700: "#691432",
    800: "#4F0A25",
    900: "#340019",
  } ,
  yellow : {
    5: "#FFF970",
    25: "#FFE83D",
    50: "#FFD60A",
    100: "#E7C009",
    200: "#CFAB08",
    300: "#869507",
    400: "#9E8006",
    500: "#866A04",
    600: "#6E5503",
    700: "#553F02",
    800: "#302A01",
    900: "#251400",
    },
    "pure-greys": {
    5: "#F9F9F9",
    25: "#E2E2E2",
    50: "#CCCCCC",
    100: "#858585",
    200: "#9E9E9E",
    300: "#888888",
    400: "#717171",
    500: "#585858",
    600: "#444444",
    700: "#202020",
    800: "#171717",
    900: "#141414",
    },
  } ,
  extend: {
      maxWidth: {
        maxContent: "1260px", 
        maxContentTab: "650px"
      },
    }
  } ,
  plugins : [] ,
};