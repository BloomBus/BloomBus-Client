// Framework and third-party non-ui
import React from 'react';
import { useHistory } from 'react-router-dom';

// Component specific modules (Component-styled, etc.)
import { OverflowMenuContainer } from './OverflowMenu-styled';

// App components, types

// Third-party components (buttons, icons, etc.)
import {
  CalciteButton,
  CalciteDropdown,
  CalciteIcon,
  CalciteDropdownItem,
  CalciteDropdownGroup
} from '@esri/calcite-components-react';

const OverflowMenu: React.FC = () => {
  const history = useHistory();

  return (
    <OverflowMenuContainer>
      <CalciteDropdown>
        <CalciteButton slot="dropdown-trigger" appearance="transparent">
          <CalciteIcon icon="handle-vertical" />
        </CalciteButton>
        <CalciteDropdownGroup scale="l" selectionMode="none">
          <CalciteDropdownItem
            iconStart="calendar"
            onClick={() =>
              window.open('https://www.bloomu.edu/documents/shuttle-schedule')
            }
          >
            Shuttle schedule
          </CalciteDropdownItem>
          <CalciteDropdownItem
            iconStart="exclamation-mark-triangle"
            onClick={() => window.open('mailto:bloombus@huskies.bloomu.edu')}
          >
            Report an issue
          </CalciteDropdownItem>
          <CalciteDropdownItem
            iconStart="information"
            onClick={() => history.push('/about')}
          >
            About
          </CalciteDropdownItem>
        </CalciteDropdownGroup>
      </CalciteDropdown>
    </OverflowMenuContainer>
  );
};

export default OverflowMenu;
