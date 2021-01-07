import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CardMedia, FormControl, Grid, makeStyles } from '@material-ui/core';
import moment from 'moment';
import LuxonUtils from '@date-io/luxon';

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { addEvent, editEvent } from '../features/eventSlice';
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

export default function EditEvent({ event, openEdit }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);
  const [eventDate, setEventDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [detail, setDetail] = useState('');
  const [file, setFile] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const initData = () => {
    setId(event.id);
    setTitle(event.title);
    setDescription(event.description);
    setDetail(event.detail);
    setImagePreviewUrl(
      event.photosImagePath
        ? 'http://localhost:3000' + event.photosImagePath
        : null
    );
    setOpen(openEdit);
    const dateSplit = event.date.split('-');
    setEventDate(
      moment(dateSplit[2] + '-' + dateSplit[1] + '-' + dateSplit[0]).format(
        'dd LLL yyyy'
      )
    );
    console.log(eventDate);
    console.log(dateFormater() === 'NaN-NaN-NaN');
  };

  useEffect(() => {
    initData();
  }, [openEdit]);

  const handleDateChange = (date) => {
    setEventDate(date);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteImageHandler = () => {
    setImagePreviewUrl(null);
    setFile('');
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
        editEvent({
          id: id,
          token: user.token,
          title: title,
          date: dateFormater(),
          description: description,
          detail: detail,
          file: file === '' ? null : file,
          photo: imagePreviewUrl,
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
      1 +
      '-' +
      month +
      '-' +
      new Date(+eventDate).getFullYear();
    return date === 'NaN-NaN-NaN' ? event.date : date;
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ backgroundColor: '#EEE2DC' }}
        >
          Modifier l'évenement
        </DialogTitle>
        <DialogContent style={{ backgroundColor: '#EEE2DC' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                value={title}
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
                value={description}
                style={{ borderColor: '#123C69 !important' }}
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
                value={detail}
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
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#123C69', color: 'white' }}
                  component="span"
                >
                  Upload image
                </Button>
              </label>

              {imagePreviewUrl ? (
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#AC3B61',
                    color: 'white',
                    marginLeft: 3,
                  }}
                  component="span"
                  onClick={deleteImageHandler}
                >
                  Delete image
                </Button>
              ) : null}
            </Grid>
            {imagePreviewUrl && (
              <Grid item xs={12}>
                <img src={imagePreviewUrl} className={classes.previewImage} />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions style={{ backgroundColor: '#EEE2DC' }}>
          <Button onClick={handleClose} style={{ color: '#AC3B61' }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} style={{ color: '#123C69' }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
