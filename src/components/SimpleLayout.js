import React from 'react';
import LayoutSkeleton from './LayoutSkeleton';
import Footer from './Footer';
import Header from './Header';
import Content from './Content';

const SimpleLayout = () => {
  return (
    <LayoutSkeleton
      header={() => <Header />}
      footer={() => <Footer />}
      navbar={() => <div />}
      content={() => <Content />}
    />
  );
};
export default SimpleLayout;
