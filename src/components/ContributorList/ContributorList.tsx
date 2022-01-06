/* Inspired by https://allcontributors.org/ */

// Framework and third-party non-ui
import React from 'react';

// Local helpers/utils/modules
import {
  contributors,
  getContributionAreaEmoji,
  getContributionAreaLabel
} from './contributors';

// Component specific modules (Component-styled, etc.)
import {
  ContributorsContainer,
  ContributorCard,
  ContributorName,
  ContributionsContainer
} from './ContributorList-styled';

// App components, types

// Third-party components (buttons, icons, etc.)

const ContributorList = () => {
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
              {contributionAreas.map((area) => (
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
};

export default ContributorList;
