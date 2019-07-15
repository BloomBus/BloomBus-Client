import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: 50px;
  font-size: 1.7em;
  font-weight: bold;
  font-family: "Product Sans";

  background-color: white;
  border-bottom: 1px solid #ddd;
`;

const StyledHeaderLogo = styled.img`
  height: 1em;
`;

const AppHeader = props => (
  <StyledHeader>
    <StyledHeaderLogo src="./bloombus-logo.svg" alt="Shuttle Icon" />
  </StyledHeader>
);

export default AppHeader;
