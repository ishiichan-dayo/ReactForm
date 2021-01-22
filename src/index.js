import React from 'react';
import ReactDOM from 'react-dom';

import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset'

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Top from './pages/Top';
import Confirm from './pages/Confirm';
import Thanks from './pages/Thanks';

const GlobalStyle = createGlobalStyle`
  ${reset}
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  body {
    font-family: "Helvetica Neue", "Helvetica", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Arial", "Yu Gothic", "Meiryo", sans-serif;
    font-size: 1.4rem;
    color: #333;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Top} />
          <Route exact path="/confirm" component={Confirm} />
          <Route exact path="/thanks" component={Thanks} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
