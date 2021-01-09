import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from 'react-notifications-component';
const NotificationHandler = ({
  error,
  notification,
  setError,
  setNotification,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (notification) {
      store.addNotification({
        title: 'notification',
        message: notification,
        type: 'success',
        insert: 'top',
        container: 'bottom-left',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
      dispatch(setNotification(null));
    }
    if (error) {
      store.addNotification({
        title: 'error',
        message: error,
        type: 'danger',
        insert: 'bottom',
        container: 'bottom-left',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
      dispatch(setError(null));
    }
  }, [error, notification]);

  return (
    <div>
      {/* {error ? errorHandler(error) : null}
      {notification ? notificationHandler(notification) : null} */}
    </div>
  );
};

export default NotificationHandler;
