import styled from 'styled-components';

export const ETALabelWrapper = styled.span`
  position: relative;
  margin-left: auto;
`;

export const ETALabelNumber = styled.span`
  position: relative;
  font-size: 1.85em;
  font-weight: bold;

  &::before {
    height: 0.2em;
    width: 0.2em;
    position: absolute;
    right: -0.15em;
    top: 0.1em;
    border-top-right-radius: 100%;
    border-top: 0.05em solid currentColor;
    border-right: 0.05em solid currentColor;
    content: '';
    animation: pulse 2s linear infinite;
  }

  &::after {
    height: 0.35em;
    width: 0.35em;
    position: absolute;
    right: -0.3em;
    top: -0.05em;
    border-top-right-radius: 100%;
    border-top: 0.05em solid currentColor;
    border-right: 0.05em solid currentColor;
    content: '';
    animation: pulse 2s linear 0.75s infinite;
  }

  @keyframes pulse {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ETALabelUnit = styled.span`
  margin-left: 0.1em;
`;
