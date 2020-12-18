import React, { useEffect, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from './Grid/GridItem.js';
import GridContainer from './Grid/GridContainer.js';
import CustomInput from './CustomInput/CustomInput.js';
import Button from './CustomButtons/Button.js';
import Card from './Card/Card.js';
import CardHeader from './Card/CardHeader.js';
import CardAvatar from './Card/CardAvatar.js';
import CardBody from './Card/CardBody.js';
import CardFooter from './Card/CardFooter.js';
import { Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   editUserName,
//   editPassword,
//   fetchUserProfile,
//   getUser,
//   clearErrors,
//   editEmail,
//   setError,
// } from '../../features/userSlice.js';
import { Link } from 'react-router-dom';
// import Alert from '@material-ui/lab/Alert';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const useStyles = makeStyles(styles);
const EditUser = () => {
  const classes = useStyles();

  // const user = useSelector(getUser);
  const dispatch = useDispatch();

  // const [fullName, setFullName] = useState(user?.full_name);
  const [fullName, setFullName] = useState();
  // const [email, setEmail] = useState(user?.user_email);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState(null);

  const editProfile = async () => {
    // if (fullName !== user.full_name) {
    //   await dispatch(editUserName({ full_name: fullName, token: user.token }));
    // }
    // if (password && password.length > 5) {
    //   await dispatch(
    //     editPassword({ newPassword: password, token: user.token })
    //   );
    //   setPassword('');
    // }
    // if (fullName !== user.full_name || password) {
    //   dispatch(
    //     fetchUserProfile({ token: user?.token, user_id: user?.user_id })
    //   );
    // }
    // if (email !== user.user_email) {
    //   if (validateEmail(email)) {
    //     dispatch(editEmail({ token: user?.token, email: email }));
    //   } else {
    //     dispatch(setError('plase enter a valid email adresse'));
    //     setEmail(user.user_email);
    //   }
    // }
  };

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  useEffect(() => {
    // dispatch(clearErrors());
  }, []);

  return (
    <GridContainer justify="center" alignItems="center">
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
            {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12}>
                <CustomInput
                  labelText="Full name"
                  id="company-disabled"
                  // onChange={(event) => {
                  //   console.log(event.target.value);
                  //   setFullName(event.target.value);
                  // }}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: false,
                    value: fullName,
                    onChange: (event) => {
                      // console.log(event.target.value);
                      setFullName(event.target.value);
                    },
                    // value: fullName,
                  }}
                />
              </GridItem>

              <GridItem xs={12} sm={12}>
                <CustomInput
                  labelText="Type"
                  id="email-address"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: true,
                    defaultValue: '',
                  }}
                />
              </GridItem>

              <GridItem xs={12} sm={12}>
                <CustomInput
                  labelText="Email"
                  id="email-address"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: email,
                    onChange: (event) => {
                      setEmail(event.target.value);
                    },
                  }}
                />
              </GridItem>
            </GridContainer>
            <Grid container alignItems="flex-end">
              <GridItem xs={12} sm={12} md={8}>
                <CustomInput
                  labelText="Phone Number"
                  id="first-name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: true,

                    defaultValue: 'user?.phone_number',
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Link to="/profile/editphone">
                  <Button color="warning">Update Phone number</Button>
                </Link>
              </GridItem>
            </Grid>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <InputLabel style={{ color: '#AAAAAA' }}>
                  Update Password
                </InputLabel>
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="New Password"
                  id="about-me2"
                  type="password"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: false,
                    value: password,
                    onChange: (event) => {
                      setPassword(event.target.value);
                    },
                  }}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button color="warning" onClick={editProfile}>
              Update Profile
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default EditUser;
