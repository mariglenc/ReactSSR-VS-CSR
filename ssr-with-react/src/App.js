import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BigGreenHeading = styled.h1`
  color: green;
  font-size: 96px;
`;

function App() {
  return (
    <>
      <BigGreenHeading>Styled component</BigGreenHeading>
      <nav>
        <ul>
          <li>
            <Link to={`/`}>Home</Link>
          </li>
          <li>
            <Link to={`/about`}>About</Link>
          </li>
          <li>
            <Link to={`/articles`}>Articles</Link>
          </li>
        </ul>
      </nav>
      <p>Home Page</p>
      <p>Home Page</p>
      <p>Home Page</p>
      <p>Home Page</p>
      <p>Home Page</p>
      <p>Home Page</p>
    </>
  );
}

export default App;
