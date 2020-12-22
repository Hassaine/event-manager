import { Grid, GridList, GridListTile, Paper } from '@material-ui/core';
import React from 'react';
import Postcard from '../Postcard';

import { makeStyles } from '@material-ui/core/styles';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    maxWidth: 745,
    height: 750,
    backgroundColor: theme.palette.background.default,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  title: {
    backgroundColor: theme.palette.background.default,
    marginBottom: 10,
    paddingTop: 10,
    height: 100,
    textAlign: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
const events = [1, 2, 3, 4, 5];

const eventsView = events.map((id) => (
  <GridListTile
    key={id}
    cols={2}
    style={{
      height: 'auto',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 3,
      marginRight: 3,
    }}
  >
    <Postcard key={id} />
  </GridListTile>
));

const MyEvents = () => {
  const classes = useStyles();
  return (
    // <Grid container justify="center" alignItems="center" spacing={2}>
    <div
      className={classes.root}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.54)' }}
    >
      <Grid container justify="center" alignItems="center">
        <Grid item xs={7}>
          <Paper elevation={3} className={classes.title}>
            <h1>Mes Événements</h1>
          </Paper>
        </Grid>
      </Grid>
      <GridList cellHeight={180} className={classes.gridList}>
        {eventsView}
      </GridList>
    </div>

    // </Grid>:
  );
};

export default MyEvents;
