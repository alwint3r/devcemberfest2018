import React from 'react';
import { Grid } from '@material-ui/core';

import RealtimeEmoji from '../components/RealtimeEmoji';
import Charts from '../components/Charts';

function IndexPage() {
  return (
    <Grid container spacing={16}>
      <Grid item xs={12} md={2}>
        <RealtimeEmoji label="Mood" />
      </Grid>
      <Grid item xs={12} md={10}>
        <Charts />
      </Grid>
    </Grid>
  );
}

export default IndexPage;
