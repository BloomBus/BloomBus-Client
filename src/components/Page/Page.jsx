import React, { Component } from 'react';

import { PageContainer, ContentContainer } from './Page-styled';

export default class Page extends Component {
  render() {
    return (
      <PageContainer>
        <ContentContainer>{this.props.children}</ContentContainer>
      </PageContainer>
    );
  }
}
