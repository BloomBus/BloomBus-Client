import styled from 'styled-components';

export const StyledHeader = styled.header`
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

export const StyledHeaderTitle = styled.label`
`;

export const LeftHeader = styled.div`
  display: flex;
  flex: 1;
  padding-left: 0.6em;
`;

export const CenterHeader = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const RightHeader = styled.div`
  display: flex;
  flex: 1;
  padding-right: 0.6em;
`;

export const HeaderBackButtonContainer = styled.div`
  display: flex
`;
