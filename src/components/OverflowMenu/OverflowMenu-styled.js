import styled from 'styled-components';

import Menu from 'calcite-react/Menu';

const OverflowMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
`;

const StyledMenu = styled(Menu)`
  font-weight: 400;
`;

export { OverflowMenuContainer, StyledMenu };
