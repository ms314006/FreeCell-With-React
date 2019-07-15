import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.scss';

const Main = (props) => {
  const { title, } = props;
  return (
    <h1
      className={styles.title}
      data-testid="title"
    >
      {title}
    </h1>
  );
};

Main.propTypes = {
  title: PropTypes.string,
};

Main.defaultProps = {
  title: 'default',
};

export default Main;
