import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '../components/Typography';
import ProductHeroLayout from '../components/ProductHeroLayout';
import { Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../components/static/Footer';
import '../styles/css/landing.css'

const backgroundImage =
    'https://source.unsplash.com/tQ0-1vkT6js/1300x900/';

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        //backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
        //backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        //filter: "blur(4px)"
    },
    button: {
        minWidth: 200,
        borderRadius: 0,
        fontWeight: theme.typography.fontWeightMedium,
        fontFamily: theme.typography.fontFamilySecondary,
        padding: theme.spacing(2, 4),
        fontSize: theme.typography.pxToRem(16),
        borderRadius: "4px",
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
        color: '#123C69'
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
        <div className={classes.background} >
            <ProductHeroLayout ClassName={classes.background}>
                <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
                <Typography align="center" variant="h2" marked="center" style={{ color: "#AC3B61" }}>
                    Partagez vos événements
                </Typography>
                <Typography align="center" variant="h5" className={classes.h5}>
                    Céez, paricipez et profitez des événements de votre intérêts.
                </Typography>
                <Link to='/SignUp' style={{ textDecoration: "none" }}>
                    <Button
                        style={{ backgroundColor: "#AC3B61", color: "#EEE2DC" }}
                        variant="contained"
                        size="large"
                        className={classes.button}
                    >
                        S'inscrire
                    </Button>
                </Link>
                <Typography variant="body2" className={classes.more} style={{ color: "#123C69" }}>
                    Découvrez l'expérience
                </Typography>
            </ProductHeroLayout>
            <Footer />
        </div>
    );
}



export default Landing;