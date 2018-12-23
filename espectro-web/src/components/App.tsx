import React, { Component } from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core';

import AppHeader from './AppHeader';

const styles = createStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: `hidden`,
    position: `relative`,
    display: `flex`,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    minWidth: 0,
  },

  toolbar: theme.mixins.toolbar,
}));

interface AppProps {
  classes: any,
}


class App extends Component<AppProps> {
  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.root}>
        <AppHeader />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);