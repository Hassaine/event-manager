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
//   import { getUser, setError, setNotification } from '../../features/userSlice';
import EditUser from '../components/profileViews/EditUser';
//   import {
//     fetchBuyedProduct,
//     selectAllProducts,
//   } from '../../features/licenceSlice';
import PruchasesHistory from '../components/profileViews/PurchasesHistory';
//   import NotificationHandler from '../statics/NotificationHandler';

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

  // const user = useSelector(getUser);
  //   const error = useSelector((state) => state.user.error);
  //   const notification = useSelector((state) => state.user.notification);
  const history = useHistory();
  const dispatch = useDispatch();
  // const products = useSelector(selectAllProducts);
  //   const licences = useSelector((state) => state.licence.licences);
  const [triggerLicence, setTriggerLicence] = useState(false);

  useEffect(() => {
    //   if (!user) {
    //     history.push('/');
    //   }
    //   if (products.length === 0) {
    //     dispatch(fetchBuyedProduct({ token: user.token }));
    //   }
    // if (
    //   products.length > 0 &&
    //   JSON.stringify(licences) === JSON.stringify({})
    // ) {
    //   setTriggerLicence(true);
    // }
    // if (user && triggerLicence) {
    //   // console.log(products, licences);
    //   for (let index = 0; index < products.length; index++) {
    //     const product = products[index];
    //     dispatch(
    //       fetchBuyedLicence({ token: user.token, product_id: product._id })
    //     );
    //   }
    //   setTriggerLicence(false);
    // }
  }, []);
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
              <BottomNavigationAction label="edit Profil" icon={<EditIcon />} />
              <BottomNavigationAction label="history" icon={<RestoreIcon />} />
            </BottomNavigation>
            {value === 2 && <PruchasesHistory />}
            {value === 0 && <InfoUser />}
            {value === 1 && <EditUser />}

            {/* <NotificationHandler
                error={error}
                setError={setError}
                notification={notification}
                setNotification={setNotification}
              /> */}
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Profile;
