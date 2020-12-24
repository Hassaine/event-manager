import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '../components/Typography';
import ProductHeroLayout from '../components/ProductHeroLayout';
import { Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../components/static/Footer';

const backgroundImage =
    'https://images.unsplash.com/photo-1468234847176-28606331216a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDN8fGV2ZW50fGVufDB8MHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60';

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        //backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
        backgroundRepeat: "no-repeat",
        // backgroundSize: "cover"
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
        <div >
            <ProductHeroLayout backgroundClassName={classes.background}>
                <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
                <Typography align="center" variant="h2" marked="center" style={{ color: "#AC3B61" }}>
                    Upgrade your Sundays
                </Typography>
                <Typography align="center" variant="h5" className={classes.h5}>
                    Enjoy secret offers up to -70% off the best luxury hotels every Sunday.
                </Typography>
                <Link to='/SignUp' style={{ textDecoration: "none" }}>
                    <Button
                        style={{ backgroundColor: "#AC3B61", color: "#EEE2DC" }}
                        variant="contained"
                        size="large"
                        className={classes.button}
                    >
                        Register
                    </Button>
                </Link>
                <Typography variant="body2" className={classes.more} style={{ color: "#123C69" }}>
                    Discover the experience
                </Typography>
            </ProductHeroLayout>
            <Footer />
        </div>
    );
}



export default Landing;