import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '../components/Typography';
import ProductHeroLayout from '../components/ProductHeroLayout';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../components/static/Footer';

const backgroundImage =
    'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80';

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
    },
    button: {
        minWidth: 200,
        borderRadius: 0,
        fontWeight: theme.typography.fontWeightMedium,
        fontFamily: theme.typography.fontFamilySecondary,
        padding: theme.spacing(2, 4),
        fontSize: theme.typography.pxToRem(14),
        boxShadow: 'none',
        '&:active, &:focus': {
            boxShadow: 'none',
        },
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        },
    },
    more: {
        marginTop: theme.spacing(2),
    },
}));

function Landing() {

    const hist = useHistory();
    const classes = useStyles();
    const user = useSelector(state => state.user.user)

    useEffect(() => {

        if (user) hist.push('/');

    }, [user]);

    return (
        <div>
            <ProductHeroLayout backgroundClassName={classes.background}>
                <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
                <Typography color="inherit" align="center" variant="h2" marked="center">
                    Upgrade your Sundays
        </Typography>
                <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
                    Enjoy secret offers up to -70% off the best luxury hotels every Sunday.
        </Typography>
                <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    className={classes.button}
                >
                    Register
        </Button>
                <Typography variant="body2" color="inherit" className={classes.more}>
                    Discover the experience
        </Typography>
            </ProductHeroLayout>
            <Footer />
        </div>
    );
}



export default Landing;