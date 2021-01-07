import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  makeStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import InfoUser from '../components/profileViews/InfoUser';
import RestoreIcon from '@material-ui/icons/Restore';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import EditUser from '../components/profileViews/EditUser';
import PruchasesHistory from '../components/profileViews/PurchasesHistory';
import {
  setError as setErrorUser,
  setNotification as setNotificationUser,
  userProfile,
} from '../features/userSlice';
import {
  setError as setErrorEvent,
  setNotification as setNotificationEvent,
} from '../features/eventSlice';
import NotificationHandler from '../components/static/NotificationHandler';
import MyEvents from '../components/profileViews/MyEvents';
import EventIcon from '@material-ui/icons/Event';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Participations from '../components/profileViews/Participations';
import Interests from '../components/profileViews/Interests';
import '../styles/css/profile.css';
import Footer from '../components/static/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#EEE2DC',
    flexGrow: 1,
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    minHeight: '65vh',
  },
  bar: {
    marginBottom: theme.spacing(10),
  },
}));
const Profile = () => {
  // const location = useLocation();
  // let { path, url } = useRouteMatch();

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const user = useSelector((state) => state.user.user);
  // const userError = useSelector((state) => state.user.error);
  // const userNotification = useSelector((state) => state.user.notification);

  // const eventError = useSelector((state) => state.event.error);
  // const eventNotification = useSelector((state) => state.event.notification);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      history.push('/Landing');
    } else if (!('phone' in user)) {
      dispatch(userProfile({ token: user.token }));
    }
  }, [user]);
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12}>
          <BottomNavigation
            style={{ backgroundColor: '#EEE2DC' }}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels
            className={classes.bar}
          >
            <BottomNavigationAction
              label="Profil Info"
              icon={<PermIdentityIcon />}
            />
            <BottomNavigationAction label="Edit Profil" icon={<EditIcon />} />
            <BottomNavigationAction
              label="Mes evenements"
              icon={<EventIcon />}
            />
            <BottomNavigationAction
              label="Mes participations"
              icon={<EventAvailableIcon />}
            />
            <BottomNavigationAction
              label="mes intérêts"
              icon={<DateRangeIcon />}
            />
          </BottomNavigation>

          {value === 0 && <InfoUser />}
          {value === 1 && <EditUser />}
          {value === 2 && <MyEvents />}
          {value === 3 && <Participations />}
          {value === 4 && <Interests />}

          {/* notification handler for the user slice */}
          {/* <NotificationHandler
            error={userError}
            setError={setErrorUser}
            notification={userNotification}
            setNotification={setNotificationUser}
          /> */}
          {/* notification handler for the event slice */}
          {/* <NotificationHandler
            error={eventError}
            setError={setErrorEvent}
            notification={eventNotification}
            setNotification={setNotificationEvent}
          /> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
