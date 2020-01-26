// Framework and third-party non-ui
import React, { Component } from 'react';

// Local helpers/utils/modules
import {
  getContributionAreaEmoji,
  getContributionAreaLabel
} from '../../utils/functions';

// Inspired by https://allcontributors.org/

// Component specific modules (Component-styled, etc.)
import {
  ContributorsContainer,
  ContributorCard,
  ContributorName,
  ContributionsContainer
} from './ContributorList-styled';

// App components

// Third-party components (buttons, icons, etc.)

// JSON
import contributors from './contributors.json';

// CSS

class ContributorList extends Component {
  render() {
    return (
      <ContributorsContainer>
        {contributors.map(
          ({ name, avatar, contributionAreas, contributions }) => (
            <ContributorCard key={name}>
              <img
                alt="Avatar"
                src={avatar}
                width="100px"
                style={{ borderRadius: '50%' }}
              />
              <ContributorName>{name}</ContributorName>
              <div>
                {contributionAreas.map(area => (
                  <span key={area} title={getContributionAreaLabel(area)}>
                    {getContributionAreaEmoji(area)}
                  </span>
                ))}
              </div>
              <ContributionsContainer>
                {contributions.join(', ')}
              </ContributionsContainer>
            </ContributorCard>
          )
        )}
      </ContributorsContainer>
    );
  }
}

export default ContributorList;
