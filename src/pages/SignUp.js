import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { signUp } from '../features/userSlice';

import 'moment';
import MomentUtils from '@date-io/moment';
import LuxonUtils from '@date-io/luxon';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sexe, setSexe] = useState('homme');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState(new Date(1995, 11, 17));


  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const notification = useSelector((state) => state.user.notification);
  const error = useSelector((state) => state.user.error);


  const handleChange = (event) => {
    setSexe(event.target.value);
  };

  const handleDateChange = (date) => {
    setBirthday(date);
  };

  const formValidation = () => {
    let errorMessage = '';
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (username === null || username === '' || /\s/.test(username)) {
      errorMessage += ' Error in username;';
      enqueueSnackbar('Invalid username', {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        variant: 'error',
      });
    }
    if (password === null || password === '' || password.length < 6) {
      errorMessage += ' Error in password;';
      enqueueSnackbar('Invalid password', {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        variant: 'error',
      });
    }
    if (phone === null || phone === '' || !phone.match(phoneno)) {
      errorMessage += ' Error in phone number;';
      enqueueSnackbar('Invalid phone number', {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        variant: 'error',
      });
    }
    if (
      email === null ||
      email === '' ||
      !re.test(String(email).toLowerCase())
    ) {
      errorMessage += ' Error in email;';
      enqueueSnackbar('Invalid email address', {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        variant: 'error',
      });
    }
    if (errorMessage === '') return true;
    else {
      return false;
    }
  };

  const dateFormater = () => {
    const month = new Date(+birthday).getMonth() + 1;
    const date =
      new Date(+birthday).getUTCDate() +
      '-' +
      month +
      '-' +
      new Date(+birthday).getFullYear();
    return date;
  };

  const submitSignUp = (e) => {
    e.preventDefault();
    if (formValidation())
      dispatch(
        signUp({
          username: username,
          password: password,
          type: 'user',
          birthday: dateFormater(),
          sexe: sexe,
          phone: phone,
          email: email,
        })
      );
  };

  useEffect(() => {
    if (notification) {
      enqueueSnackbar(notification, {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        variant: 'success',
      });
    }
    if (error) {
      enqueueSnackbar(error, {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        variant: 'error',
      });
    }
  }, [notification]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="lastName"
                autoComplete="username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Sexe
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={sexe}
                  onChange={handleChange}
                  label="Sexe"
                  defaultValue="homme"
                >
                  <MenuItem value={'homme'}>Homme</MenuItem>
                  <MenuItem value={'femme'}>Femme</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                onChange={(event) => setPhone(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>

            <MuiPickersUtilsProvider utils={LuxonUtils}>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  fullWidth
                >
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd LLL yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Birthday"
                    value={birthday}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </FormControl>
              </Grid>
            </MuiPickersUtilsProvider>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="J'accepte les conditions et les termes d'utilisaton"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            style={{ backgroundColor: "#123C69", color: "#EEE2DC" }}
            onClick={submitSignUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
