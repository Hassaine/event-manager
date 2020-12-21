import React from 'react';
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
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { addInterest, addParticipation } from '../features/eventSlice';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 745,
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
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {
    margin: theme.spacing(1),
    fontSize: '75%',
},
}));

export default function RecipeReviewCard({ id, title, date, description, detail }) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user)
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const submitInterest = () => {
    dispatch(addInterest({
      id: id,
      token: user.token
    }))
  }

  const submitParticipation = () => {
    dispatch(addParticipation({
      id: id,
      token: user.token
    }))
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader= {date}
      />
      {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="contained"
          color="inherit"
          className={classes.button}
          startIcon={<FavoriteIcon />}
          onClick={submitInterest}
        >
          Ineterests
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<DirectionsWalkIcon />}
          onClick={submitParticipation}
        >
          Pariticipate
        </Button>
        
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
          <Typography paragraph>More Details:</Typography>
          <Typography paragraph>
            {detail}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}