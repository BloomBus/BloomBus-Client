import styled from 'styled-components';
import { CalciteH6 } from 'calcite-react/Elements';

export const ContributorsContainer = styled.div`
  columns: 1/3;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16em, 1fr));
  grid-gap: 1em;
`;

export const ContributorCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;

  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.1);

  padding: 1em;
  text-align: center;

  & > img {
    min-width: 100px;
    min-height: 100px;
    margin-bottom: 10px;
  }
`;

export const ContributorName = styled(CalciteH6)`
  margin: 0; /* Override calcite-react margin */
  margin-bottom: 0.6em;
  font-weight: 600;
`;

export const ContributionsContainer = styled.div`
  max-width: 16em;
  font-size: 14px;
  line-height: 1.25em;
`;
