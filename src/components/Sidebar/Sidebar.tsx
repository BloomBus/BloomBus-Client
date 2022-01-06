// Framework and third-party non-ui
import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Local helpers/utils/modules

// Component specific modules (Component-styled, etc.)
import { SidebarContainer, LoopActivityWrapper } from './Sidebar-styled';

// App components, types
import { Loop, LoopStops, Shuttles, StopKey, Stops } from 'types';

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

interface CircleIconProps {
  size: number;
  color: string;
}
const CircleIcon: React.FC<CircleIconProps> = ({ size, color }) => (
  <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} />
  </svg>
);

interface SidebarProps {
  loops: Loop[];
  stops: Stops;
  loopStops: LoopStops;
  shuttles?: Shuttles;
  onStopSelect: (key: StopKey) => void;
}
const Sidebar: React.FC<SidebarProps> = ({
  loops,
  stops,
  loopStops,
  shuttles,
  onStopSelect
}) => {
  const history = useHistory();

  const [openListIndexes, setOpenListIndexes] = useState([0]);

  const toggleList = (i: number) => {
    if (openListIndexes.includes(i)) {
      setOpenListIndexes(openListIndexes.filter((item) => i !== item));
    } else {
      setOpenListIndexes([...openListIndexes, i]);
    }
  };

  return (
    <SidebarContainer>
      <ListHeader>Shuttle Loops</ListHeader>
      {loops.map(({ properties: { key, color, name } }, i) => {
        const currentLoopStops = loopStops[key].map(
          (stopKey) => stops[stopKey]
        );
        const currentLoopShuttles =
          shuttles &&
          Object.entries(shuttles).filter(
            ([shuttleID, shuttle]) => shuttle.properties.loopKey === key
          );
        const noShuttlesAvailable =
          !currentLoopShuttles || currentLoopShuttles.length === 0;

        const open = openListIndexes.includes(i);

        return (
          <Fragment key={key}>
            <ListItem
              leftNode={<CircleIcon size={20} color={color} />}
              rightNode={
                open ? (
                  <ChevronUpIcon size={24} />
                ) : (
                  <ChevronDownIcon size={24} />
                )
              }
              onClick={() => toggleList(i)}
            >
              <ListItemTitle>{name}</ListItemTitle>
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
            <List nested tabIndex={0} open={open}>
              <ListHeader>Stops</ListHeader>
              {currentLoopStops.map(({ properties: { stopKey, name } }) => (
                <ListItem
                  key={stopKey}
                  leftNode={<NextStopIcon width="20" height="20" />}
                  onClick={() => onStopSelect(stopKey)}
                >
                  <ListItemTitle>{name}</ListItemTitle>
                </ListItem>
              ))}
            </List>
            <List nested tabIndex={0} open={open}>
              <ListHeader>Shuttles</ListHeader>
              {noShuttlesAvailable ? (
                <ListItem>
                  <ListItemTitle>No active shuttles</ListItemTitle>
                </ListItem>
              ) : (
                currentLoopShuttles.map(([shuttleID, shuttle], i) => (
                  <ListItem
                    key={shuttleID}
                    onClick={() => history.push(`/shuttle/${shuttleID}`)}
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
};

export default Sidebar;
