import styled from 'styled-components';

export const PageContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: [col1-start] minmax(0, 1fr) [col1-end col2-start] minmax(
      auto,
      60em
    ) [col2-end col3-start] minmax(0, 1fr) [col3-end];
  overflow-y: scroll;
  background-color: ${props => props.theme.palette.offWhite};
`;

export const ContentContainer = styled.div`
  grid-column: 2;
  padding: 1.8em 3em;
`;
