import styled from 'styled-components';

export const SidebarContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 51px;
  left: 0;
  height: calc(100% - 51px);
  min-width: 18rem;
  max-width: 30vw;
  width: 22rem;
  z-index: 1;

  background-color: #fff;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const LoopActivityWrapper = styled.span`
  display: flex;
  align-items: center;

  & > svg {
    margin-right: 0.35em;
  }
`;