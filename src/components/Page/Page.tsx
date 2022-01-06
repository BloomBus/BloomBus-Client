import React from 'react';

import { PageContainer, ContentContainer } from './Page-styled';

const Page: React.FC = ({ children }) => {
  return (
    <PageContainer>
      <ContentContainer>{children}</ContentContainer>
    </PageContainer>
  );
};

export default Page;
