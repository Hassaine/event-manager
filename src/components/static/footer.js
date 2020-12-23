import React from 'react';
import '../../styles/css/footer.css';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import PhoneIcon from '@material-ui/icons/Phone';
import YoutubeIcon from '@material-ui/icons/YouTube';
import EmailIcon from '@material-ui/icons/Email';
import InstagramIcon from '@material-ui/icons/Instagram';
import ShopIcon from '@material-ui/icons/Shop';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  logo: {
    marginTop: theme.spacing(20),
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <div className={classes.logo}>
          <h3>
            EventManager
          </h3>
        </div>

        <p className="footer-company-name">
          {' '}
          Copyright MLSD &copy; 2020. All rights reserved
        </p>
      </div>

      <div className="footer-center">
        <div>
          <span>
            {' '}
            <LocationOnIcon />
            <p> 45 rue des saints-pères 75006 </p>
          </span>{' '}
        </div>

        <div>

          {' '}
          <PhoneAndroidIcon /> <p> (+33) 791 934 731 </p>

        </div>
        <div>
          {' '}
          <PhoneIcon /> <p> (+33) 21 342 985 </p>
        </div>

        <div>
          <EmailIcon /> <p> contact@eventmanager.com </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>A propos</span>
          EventManager est une plateforme pour la création et le partages
          de divers évenements.
        </p>

        <div className="footer-icons">
          <a href="#">
            <FacebookIcon />
          </a>
          <a href="#">
            <YoutubeIcon />
          </a>
          <a href="#">
            <InstagramIcon />
          </a>
          <a href="#">
            <ShopIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
