import { Grid, GridList, GridListTile, Paper } from '@material-ui/core';
import React from 'react';
import Postcard from '../Postcard';

import { makeStyles } from '@material-ui/core/styles';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { getParticipations } from '../../features/eventSlice';
import { useSelector } from 'react-redux';

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

const Participations = () => {
  const classes = useStyles();
  const events = useSelector(getParticipations);
  const eventsView = events.map((event) => (
    <GridListTile
      key={event.id}
      cols={2}
      style={{
        height: 'auto',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 3,
        marginRight: 3,
      }}
    >
      <Postcard
        key={event.id}
        id={event.id}
        title={event.title}
        date={event.date}
        detail={event.detail}
        description={event.description}
        nbParticipents={event.nbParticipents}
        nbInterested={event.nbInterested}
        userParticipate={event.userParticipate}
        userInterested={event.userInterested}
      />
    </GridListTile>
  ));

  return (
    // <Grid container justify="center" alignItems="center" spacing={2}>
    <div
      className={classes.root}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.54)' }}
    >
      <Grid container justify="center" alignItems="center">
        <Grid item xs={7}>
          <Paper elevation={3} className={classes.title}>
            <h1>Mes Participations</h1>
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

export default Participations;
