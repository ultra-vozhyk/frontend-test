import React from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./lib/apolloClient";
import { DailyReportPage } from "./DailyReportPage";
import { login } from "./lib/user";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

login("test1a@capmo.de", "123456qwerty");

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#EAEAEA",
    },
    primary: {
      main: "#A2C617",
    },
    secondary: {
      main: "#2C2C2C",
    },
  },
});

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <DailyReportPage
          projectId="a5b60f3a-8e94-11ea-be39-b300a4e40f96"
          date="2020-11-08"
        />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
