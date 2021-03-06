// Framework and third-party non-ui
import React, { Fragment, PureComponent } from 'react';

// Local helpers/utils/modules

// Component specific modules (Component-styled, etc.)
import { SidebarContainer, LoopActivityWrapper } from './Sidebar-styled';

// App components

// Third-party components (buttons, icons, etc.)
import List, {
  ListItem,
  ListHeader,
  ListItemTitle,
  ListItemSubtitle
} from 'calcite-react/List';
import ChevronUpIcon from 'calcite-ui-icons-react/ChevronUpIcon';
import ChevronDownIcon from 'calcite-ui-icons-react/ChevronDownIcon';
import MoonIcon from 'calcite-ui-icons-react/MoonIcon';
import NextStopIcon from '../NextStopIcon';

// JSON

// CSS

const CircleIcon = ({ size, color }) => (
  <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} />
  </svg>
);

class Sidebar extends PureComponent {
  state = {
    openListIndexes: [0]
  };

  toggleList = i => {
    if (this.state.openListIndexes.includes(i)) {
      this.setState(prevState => ({
        openListIndexes: prevState.openListIndexes.filter(item => i !== item)
      }));
    } else {
      this.setState(prevState => ({
        openListIndexes: [...prevState.openListIndexes, i]
      }));
    }
  };

  render() {
    const {
      loops,
      stops,
      loopStops,
      shuttles,
      onStopSelect,
      onShuttleSelect
    } = this.props;
    return (
      <SidebarContainer>
        <ListHeader>Shuttle Loops</ListHeader>
        {loops.map((loop, i) => {
          const currentLoopStops = loopStops[loop.properties.key].map(
            stopKey => stops[stopKey]
          );
          const currentLoopShuttles =
            shuttles &&
            Object.entries(shuttles).filter(
              ([shuttleID, shuttle]) =>
                shuttle.properties.loopKey === loop.properties.key
            );
          const noShuttlesAvailable =
            !currentLoopShuttles || currentLoopShuttles.length === 0;

          const open = this.state.openListIndexes.includes(i);
          return (
            <Fragment key={loop.properties.key}>
              <ListItem
                leftNode={
                  <CircleIcon size="20" color={loop.properties.color} />
                }
                rightNode={
                  open ? (
                    <ChevronUpIcon size="24" />
                  ) : (
                    <ChevronDownIcon size="24" />
                  )
                }
                onClick={() => this.toggleList(i)}
              >
                <ListItemTitle>{loop.properties.name}</ListItemTitle>
                <ListItemSubtitle>
                  {noShuttlesAvailable ? (
                    <LoopActivityWrapper>
                      <MoonIcon size={16} />
                      Inactive
                    </LoopActivityWrapper>
                  ) : (
                    'Active'
                  )}
                </ListItemSubtitle>
              </ListItem>
              <List nested tabIndex="0" open={open}>
                <ListHeader>Stops</ListHeader>
                {currentLoopStops.map(stop => (
                  <ListItem
                    key={stop.properties.stopKey}
                    leftNode={<NextStopIcon width="20" height="20" />}
                    onClick={() => onStopSelect(stop.properties.stopKey)}
                  >
                    <ListItemTitle>{stop.properties.name}</ListItemTitle>
                  </ListItem>
                ))}
              </List>
              <List nested tabIndex="0" open={open}>
                <ListHeader>Shuttles</ListHeader>
                {noShuttlesAvailable ? (
                  <ListItem>
                    <ListItemTitle>No active shuttles</ListItemTitle>
                  </ListItem>
                ) : (
                  currentLoopShuttles.map(([shuttleID, shuttle], i) => (
                    <ListItem
                      key={shuttleID}
                      onClick={() => onShuttleSelect(shuttleID)}
                    >
                      <ListItemTitle>{`#${i + 1}`}</ListItemTitle>
                    </ListItem>
                  ))
                )}
              </List>
            </Fragment>
          );
        })}
      </SidebarContainer>
    );
  }
}

export default Sidebar;
