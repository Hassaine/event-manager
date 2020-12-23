import React, { useEffect, useState } from 'react';
import Footer from '../components/static/Footer';
import Postcard from '../components/Postcard';
import { Grid, GridList, GridListTile, makeStyles } from '@material-ui/core';
import {
  getAllEvents,
  getEventsByKeyword,
  getParticipations,
  getUserInterestedEvents,
  getUserParticipationEvents,
  setError,
  setNotification,
} from '../features/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddEvent from '../components/AddEvent';
import { useSnackbar } from 'notistack';
import NotificationHandler from '../components/static/NotificationHandler';

function Home() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: '#EEE2DC',
    },
    gridList: {
      maxWidth: 745,
      paddingBottom: "50px"
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));

  const classes = useStyles();
  const dispatch = useDispatch();
  const searchEvents = useSelector(getEventsByKeyword);
  const events = useSelector(state => state.event.events)
  const user = useSelector((state) => state.user.user);
  const hist = useHistory();
  const notification = useSelector((state) => state.event.notification);
  const error = useSelector((state) => state.event.error);


  useEffect(() => {

    if (!user) hist.push('/Landing');
    // else if (events.length === 0) dispatch(getAllEvents({ token: user.token }));
    // else if (!('userParticipate' in events[0]))
    //   dispatch(getUserParticipationEvents({ token: user.token }));
    // else if (!('userInterested' in events[0]))
    //   dispatch(getUserInterestedEvents({ token: user.token }));

  }, [user]);

  let eventsView = searchEvents
    ? searchEvents.map((event) => (
      <GridListTile
        key={event.id}
        cols={2}
        style={{ height: 'auto', marginTop: 30 }}
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
          owner={event.ownerName}
          event={event}
        />
      </GridListTile>
    ))
    : [];

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile cols={2} style={{ height: 'auto', marginTop: 30 }}>
          <AddEvent />
        </GridListTile>
        {eventsView}
      </GridList>
      <Footer />
      <NotificationHandler
        error={error}
        notification={notification}
        setError={setError}
        setNotification={setNotification}
      />
    </div>
  );
}

export default Home;
