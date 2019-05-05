import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent } from '@material-ui/core';

const styles = theme => ({
  title: {
    color: 'primary'
  },
  styledHeader: {
    '& h2': {
      color: '#c5b2b2'
    }
  }
});

const DialogComponent = ({
  component, title, closeDialog, open, classes
}) => (
  <Dialog fullWidth open={open} onClose={() => closeDialog()}>
    <DialogTitle className={classes.styledHeader}>{title}</DialogTitle>
    <DialogContent className={classes.content}>{component}</DialogContent>
  </Dialog>
);

DialogComponent.propTypes = {
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  closeDialog: PropTypes.func.isRequired
};

DialogComponent.defaultProps = {
  classes: {}
};

DialogComponent.defaultProps = { title: '' };

export default withStyles(styles)(DialogComponent);
