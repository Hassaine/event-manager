import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';

const NotificationHandler = ({
  error,
  notification,
  setError,
  setNotification,
}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const errorHandler = (error) => {
    enqueueSnackbar('error : ' + error, {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
      variant: 'error',
    });
    dispatch(setError(null));
  };

  const notificationHandler = (message) => {
    enqueueSnackbar(message, {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },

      variant: 'success',
    });
    dispatch(setNotification(null));
  };

  return (
    <div>
      {error && errorHandler(error)}
      {notification && notificationHandler(notification)}
    </div>
  );
};

export default NotificationHandler;
