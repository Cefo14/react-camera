import React, { memo } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './useStyles';

const Preview = ({
  url,
  onAccept,
  onReject,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img
        alt="photho"
        src={url}
        className={classes.image}
      />
      <div className={classes.actionContainer}>
        <div className={classes.actionSpace}>
          <IconButton
            className={classes.iconButton}
            onClick={onReject}
          >
            <CloseIcon />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            onClick={onAccept}
          >
            <CheckIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

Preview.propTypes = {
  url: PropTypes.string,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
};

Preview.defaultProps = {
  url: '',
  onAccept: () => {},
  onReject: () => {},
};

export default memo(Preview);
