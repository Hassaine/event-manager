import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CardMedia, FormControl, Grid, makeStyles } from '@material-ui/core';
import 'moment';
import LuxonUtils from '@date-io/luxon';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { addEvent } from '../features/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  previewImage: {
    width: '100%',
    height: 'auto',
  },
}));

export default function AddEvent() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);
  const [eventDate, setEventDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [detail, setDetail] = useState('');
  const [file, setFile] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState();

  const handleDateChange = (date) => {
    setEventDate(date);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formValidation = () => {
    let errorMessage = '';
    if (title === null || title === '') {
      errorMessage += ' Error in title;';
      enqueueSnackbar('Invalid title', {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        variant: 'error',
      });
    }
    if (description === null || description === '') {
      errorMessage += ' Error in description;';
      enqueueSnackbar('Invalid description', {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        variant: 'error',
      });
    }
    if (detail === null || detail === '') {
      errorMessage += ' Error in detail;';
      enqueueSnackbar('Invalid detail', {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        variant: 'error',
      });
    }
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    if (eventDate === null || eventDate === '' || eventDate < today) {
      errorMessage += ' Error in date;';
      enqueueSnackbar('Invalid date', {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        variant: 'error',
      });
    }
    if (errorMessage === '') return true;
    else return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValidation()) {
      dispatch(
        addEvent({
          token: user.token,
          title: title,
          date: dateFormater(),
          description: description,
          detail: detail,
          file: file,
        })
      );
      setOpen(false);
      setImagePreviewUrl(null);
    }
  };

  const dateFormater = () => {
    const month = new Date(+eventDate).getMonth() + 1;
    const date =
      new Date(+eventDate).getUTCDate() +
      '-' +
      month +
      '-' +
      new Date(+eventDate).getFullYear();
    return date;
  };

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
      console.log(imagePreviewUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ width: '100%', opacity: '0.9' }}
        color="primary"
        startIcon={<PlaylistAddIcon />}
        onClick={handleClickOpen}
      >
        Add a new event
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new event you have to fill in all the fields above, that
            should contain : the title of the event, its date, a summary of the
            topic the event, and some details.
          </DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                onChange={(event) => setTitle(event.target.value)}
              />
            </Grid>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd LLL yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date"
                    value={eventDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </FormControl>
              </Grid>
            </MuiPickersUtilsProvider>
            <Grid item xs={12}>
              <TextField
                multiline
                rows={4}
                id="description"
                label="desc"
                variant="outlined"
                fullWidth
                onChange={(event) => setDescription(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                rows={4}
                id="detail"
                label="detail"
                variant="outlined"
                fullWidth
                onChange={(event) => setDetail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={photoUpload}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload image
                </Button>
              </label>
            </Grid>
            {imagePreviewUrl && (
              <Grid item xs={12}>
                {/* <CardMedia
                  className={classes.media}
                  image={imagePreviewUrl}
                />  */}
                <img src={imagePreviewUrl} className={classes.previewImage} />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
