import React from 'react';
import PropTypes from 'prop-types';

const LayoutSkeleton = ({ header, navbar, content, footer }) => {
  return (
    <div id="container">
      {header()}
      {navbar()}
      <div id="content">
        <article>{content()}</article>
      </div>
      <footer>{footer()}</footer>
    </div>
  );
};

LayoutSkeleton.propTypes = {
  footer: PropTypes.func.isRequired,
  header: PropTypes.func.isRequired,
  navbar: PropTypes.func.isRequired,
  content: PropTypes.func.isRequired,
};
export default LayoutSkeleton;
