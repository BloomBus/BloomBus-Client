// Framework and third-party non-ui
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Component specific modules (Component-styled, etc.)
import { OverflowMenuContainer, StyledMenu } from './OverflowMenu-styled';

// App components, types

// Third-party components (buttons, icons, etc.)
import { MenuItem } from 'calcite-react/Menu';
import Popover from 'calcite-react/Popover';
import HandleVerticalIcon from 'calcite-ui-icons-react/HandleVerticalIcon';

const OverflowMenu: React.FC = () => {
  const history = useHistory();

  const [open, setOpen] = useState(false);

  return (
    <OverflowMenuContainer>
      <Popover
        targetEl={
          <HandleVerticalIcon onClick={() => setOpen((open) => !open)} />
        }
        open={open}
        onRequestClose={() => setOpen(false)}
        targetContainerStyles={{
          display: 'flex'
        }}
      >
        <StyledMenu large>
          <MenuItem
            onClick={() =>
              window.open('https://www.bloomu.edu/documents/shuttle-schedule')
            }
          >
            Shuttle Schedule
          </MenuItem>
          <MenuItem
            disabled
            subtitle="WIP"
            onClick={() => history.push('/alerts')}
          >
            Status Alerts
          </MenuItem>
          <MenuItem
            disabled
            subtitle="WIP"
            onClick={() => history.push('/feedback')}
          >
            Feedback
          </MenuItem>
          <MenuItem
            onClick={() => window.open('mailto:bloombus@huskies.bloomu.edu')}
          >
            Report an Issue
          </MenuItem>
          <MenuItem onClick={() => history.push('/about')}>About</MenuItem>
        </StyledMenu>
      </Popover>
    </OverflowMenuContainer>
  );
};

export default OverflowMenu;
