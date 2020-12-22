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
import { setError, setNotification, userProfile } from '../features/userSlice';
import NotificationHandler from '../components/static/NotificationHandler';
import MyEvents from '../components/profileViews/MyEvents';
import EventIcon from '@material-ui/icons/Event';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Participations from '../components/profileViews/Participations';
import Interests from '../components/profileViews/Interests';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    minHeight: '65vh',
  },
  bar: {
    marginBottom: theme.spacing(10),
  },
}));
const Profile = () => {
  const location = useLocation();
  let { path, url } = useRouteMatch();

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const user = useSelector((state) => state.user.user);
  const error = useSelector((state) => state.user.error);
  const notification = useSelector((state) => state.user.notification);
  const history = useHistory();
  const dispatch = useDispatch();
  // const products = useSelector(selectAllProducts);
  //   const licences = useSelector((state) => state.licence.licences);
  const [triggerLicence, setTriggerLicence] = useState(false);

  useEffect(() => {
    if (!user) {
      history.push('/');
    } else if (!('phone' in user)) {
      dispatch(userProfile({ token: user.token }));
    }
  }, [user]);
  return (
    <React.Fragment>
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

            <NotificationHandler
              error={error}
              setError={setError}
              notification={notification}
              setNotification={setNotification}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Profile;
