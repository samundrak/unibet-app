import React from 'react';
import PropTypes from 'prop-types';
import LayoutSkeleton from './LayoutSkeleton';
import Footer from './Footer';
import Header from './Header';
import Content from './Content';

const SimpleLayout = ({
  wasErrorFetchingLiveScore,
  loading,
  totalRecords,
  records,
}) => {
  return (
    <LayoutSkeleton
      header={() => <Header />}
      footer={() => <Footer />}
      navbar={() => <div />}
      content={() => (
        <Content
          wasErrorFetchingLiveScore={wasErrorFetchingLiveScore}
          loading={loading}
          totalRecords={totalRecords}
          records={records}
        />
      )}
    />
  );
};
SimpleLayout.propTypes = {
  wasErrorFetchingLiveScore: PropTypes.bool,
  loading: PropTypes.bool,
  totalRecords: PropTypes.number,
  records: PropTypes.object,
};
export default SimpleLayout;
