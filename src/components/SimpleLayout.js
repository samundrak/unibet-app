import React from 'react';
import LayoutSkeleton from './LayoutSkeleton';
import Footer from './Footer';
import Header from './Header';
import Content from './Content';

const SimpleLayout = ({ totalRecords, records }) => {
  return (
    <LayoutSkeleton
      header={() => <Header />}
      footer={() => <Footer />}
      navbar={() => <div />}
      content={() => <Content totalRecords={totalRecords} records={records} />}
    />
  );
};
export default SimpleLayout;
