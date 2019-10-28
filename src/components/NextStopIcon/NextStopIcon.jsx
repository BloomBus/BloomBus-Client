import React from 'react';

import { NextStopSVG } from './NextStopIcon-styled';

const NextStopIcon = props => (
  <NextStopSVG viewBox="0 0 30 20" {...props}>
    <path
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      fill="#777b8e"
      d="M9.89 10.84h7.31v4.07l6-5.24-6-5.2v4.1H9.88v2.24H0V8.57h9.88a9.7 9.7 0 1 1 0 2.27z"
    />
  </NextStopSVG>
);

export default NextStopIcon;
