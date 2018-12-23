import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core';

const styles = createStyles((theme: Theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
  },

  appBar: {
    backgroundColor: `#2196f3`,
    color: `#fff`,
  },
}));

interface HeaderProps {
  classes: any,
}

class AppHeader extends React.Component<HeaderProps, {}> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              ESPectro32 feat. JavaScript
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(AppHeader);
