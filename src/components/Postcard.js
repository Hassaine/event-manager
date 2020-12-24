import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  addInterest,
  addParticipation,
  removeParticipation,
  removeInterest,
} from '../features/eventSlice';
import EditEvent from './EditEvent';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 745,
    backgroundColor: '#BAB2B5',
    borderRadius: '10px',
    boxShadow:
      'inset 0 -3em 3em rgba(0,0,0,0.14), 0 0  0 2px rgb(255,255,255), 0.3em 0.3em 1em rgba(0,0,0,0.3)',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  stats: {
    marginLeft: '10px',
    width: '10%',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {
    margin: theme.spacing(1),
    fontSize: '90%',
    textTransform: 'capitalize',
  },
  title: {
    fontWeight: 'bold',
  },
}));

export default function RecipeReviewCard({
  id,
  title,
  date,
  description,
  detail,
  nbParticipents,
  nbInterested,
  userParticipate,
  userInterested,
  owner,
  event,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const events = useSelector((state) => state.event.events);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const submitInterest = () => {
    dispatch(
      addInterest({
        id: id,
        token: user.token,
      })
    );
  };

  const removeInterested = () => {
    dispatch(
      removeInterest({
        id: id,
        token: user.token,
      })
    );
  };

  const submitParticipation = () => {
    dispatch(
      addParticipation({
        id: id,
        token: user.token,
      })
    );
  };

  const removeParticipationn = () => {
    dispatch(
      removeParticipation({
        id: id,
        token: user.token,
      })
    );
  };

  const openEditClick = () => {
    console.log('edit Click');
    setOpenEdit(!openEdit);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {event.ownerPhotosPath ? (
              <img
                src={'http://localhost:3000' + event.ownerPhotosPath}
                alt={'profile'}
              ></img>
            ) : owner ? (
              owner.charAt(0).toUpperCase()
            ) : (
              'A'
            )}
          </Avatar>
        }
        action={
          user.username === event.ownerName ? (
            <IconButton aria-label="settings" onClick={openEditClick}>
              <EditIcon />
            </IconButton>
          ) : null
        }
        title={<b>{title}</b>}
        subheader={date}
      />
      {event.photosImagePath && (
        <CardMedia
          className={classes.media}
          image={'http://localhost:3000' + event.photosImagePath}
          title="Paella dish"
        />
      )}
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {(!userInterested && (
          <Button
            variant="contained"
            className={classes.button}
            startIcon={<FavoriteIcon />}
            onClick={submitInterest}
            style={{ backgroundColor: '#EDC7B7' }}
          >
            Intéressé
          </Button>
        )) ||
          (userInterested && (
            <Button
              variant="contained"
              color="inherit"
              className={classes.button}
              style={{ opacity: 0.6, backgroundColor: '#EDC7B7' }}
              startIcon={<FavoriteIcon />}
              onClick={removeInterested}
            >
              Je suis intéressé
            </Button>
          ))}

        {(!userParticipate && (
          <Button
            variant="contained"
            style={{ backgroundColor: '#123C69', color: 'white' }}
            className={classes.button}
            startIcon={<DirectionsWalkIcon />}
            onClick={submitParticipation}
          >
            Pariticiper
          </Button>
        )) ||
          (userParticipate && (
            <Button
              variant="contained"
              color="primary"
              style={{
                opacity: 0.6,
                backgroundColor: '#123C69',
                color: 'white',
              }}
              className={classes.button}
              startIcon={<DirectionsWalkIcon />}
              onClick={removeParticipationn}
            >
              Je participe
            </Button>
          ))}

        <div className={classes.stats}>
          <FavoriteIcon
            fontSize="small"
            style={{
              float: 'left',
              margin: 0,
              marginRight: '3px',
              color: '#AC3B61',
            }}
          />
          <p style={{ float: 'left', margin: 0, color: '#AC3B61' }}>
            {nbInterested}
          </p>

          <DirectionsWalkIcon
            fontSize="small"
            style={{
              marginLeft: '12px',
              float: 'left',
              marginLeft: '12px',
              color: '#123C69',
            }}
          />
          <p style={{ float: 'left', margin: 0, color: '#123C69' }}>
            {nbParticipents}
          </p>
        </div>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <b> More Details </b>
          </Typography>
          <Typography paragraph>{detail}</Typography>
        </CardContent>
      </Collapse>
      <EditEvent event={event} openEdit={openEdit} />
    </Card>
  );
}
