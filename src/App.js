import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import routes from "./routes";
import { ThemeProvider } from "styled-components";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import NotFound from "./screens/NotFound";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import Layout from "./components/Layout";
import Add from "./screens/Add";
import Detail from "./screens/Detail";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                {isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <Login />
                )}
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp}>
                  <SignUp />
                </Route>
              ) : null}
              <Route path={routes.add}>
                <Layout>
                  <Add />
                </Layout>
              </Route>
              <Route path={routes.detail}>
                <Layout>
                  <Detail />
                </Layout>
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
