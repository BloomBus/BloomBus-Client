import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: 50px;
  font-size: 1.3em;
  line-height: 1.7em;
  font-weight: bold;
  font-family: 'Product Sans';
  color: #000;

  & > svg {
    position: relative;
    top: -0.1em;
    margin-left: 0.2em;
  }

  background-color: white;
  border-bottom: 1px solid #ddd;
`;

const AppHeader = props => <StyledHeader {...props} />;

export default withRouter(AppHeader);
