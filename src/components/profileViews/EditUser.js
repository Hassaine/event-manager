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
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  clearErrors,
  setError,
  editProfile,
} from '../../features/userSlice.js';

import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';

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

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  // const [fullName, setFullName] = useState(user?.full_name);
  const [username, setFullName] = useState(user?.username);
  // const [email, setEmail] = useState(user?.user_email);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(user?.phone);
  const [open, setOpen] = useState(false);

  const editProfileClick = async () => {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    //user name
    if (username !== user.username) {
      setOpen(true);
    }

    //user password
    if (password && password.length > 5) {
      await dispatch(
        editProfile({
          username: null,
          token: user?.token,
          phone: null,
          password: password,
          email: null,
          birthday: null,
          type: null,
          sexe: null,
        })
      );
      setPassword('');
    }

    //user phone number
    if (
      phone !== null &&
      phone !== '' &&
      phone.match(phoneno) &&
      phone !== user?.phone
    ) {
      dispatch(
        editProfile({
          username: null,
          token: user?.token,
          phone: phone,
          password: null,
          email: null,
          birthday: null,
          type: null,
          sexe: null,
        })
      );
    }

    //user email
    if (email !== user?.email) {
      if (validateEmail(email)) {
        dispatch(
          editProfile({
            username: null,
            token: user?.token,
            phone: null,
            password: null,
            email: email,
            birthday: null,
            type: null,
            sexe: null,
          })
        );
      } else {
        dispatch(setError('plase enter a valid email adresse'));
        setEmail(user.user_email);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    dispatch(
      editProfile({
        username: username,
        token: user?.token,
        phone: null,
        password: null,
        email: null,
        birthday: null,
        type: null,
        sexe: null,
      })
    );

    //coming soon
    //  dispatch(logout())//
    setOpen(false);
  };

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  useEffect(() => {
    dispatch(clearErrors());
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
                  labelText="UserName"
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
                    value: username,
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
                  id="email-address1"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    disabled: true,
                    // defaultValue: user.type,
                    value: user?.type,
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
                  id="pone-number"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: phone,
                    onChange: (event) => {
                      setPhone(event.target.value);
                    },
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Link to="#" style={{ textDecoration: 'none' }}>
                  <Button
                    style={{ backgroundColor: '#123C69' }}
                    disabled={true}
                  >
                    Update Phone number
                  </Button>
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
                    type: 'password',
                    onChange: (event) => {
                      setPassword(event.target.value);
                    },
                  }}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <Button
              style={{ backgroundColor: '#123C69' }}
              onClick={editProfileClick}
            >
              Update Profile
            </Button>
          </CardFooter>
        </Card>
      </GridItem>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'UserName Update !'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Dear user, in order to change your username you need to logout and
            login again with your new username.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ backgroundColor: grey['500'] }}
          >
            Disagree
          </Button>
          <Button
            onClick={handleAgree}
            style={{ backgroundColor: green.A400 }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </GridContainer>
  );
};

export default EditUser;
