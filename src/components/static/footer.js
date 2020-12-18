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
            EventManager<span>.cc</span>
          </h3>
        </div>

        <p className="footer-company-name">
          {' '}
          Copyright MLSD &copy; 2020. All rights reserved
        </p>
      </div>

      <div className="footer-center">
        <div>
          <p>
            <span>
              {' '}
              <LocationOnIcon />
              45 rue des saints-pères 75006{' '}
            </span>{' '}
            Paris, France.
          </p>
        </div>

        <div>
          <p>
            {' '}
            <PhoneAndroidIcon /> (+33) 791 934 731{' '}
          </p>
        </div>
        <div>
          <p>
            {' '}
            <PhoneIcon /> (+33) 21 342 985{' '}
          </p>
        </div>

        <div>
          <p>
            <EmailIcon /> contact@eventmanager.com
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
          TechsioCc is a new Brand for the online sale of all types of digital
          codes and mainly Gaming codes. Appeared in June 2020, TechsioCc
          operates in the Algerian market mainly, Maghreb or even Arab under the
          supervision of an Algerian company located in Cheraga, Algiers,
          Algeria.
        </p>

        <div className="footer-icons">
          <a href="https://web.facebook.com/techsio.cc/">
            <FacebookIcon />
          </a>
          <a href="https://www.youtube.com/channel/UC1TbhyBtN6Nofv5FGS7K_Bg">
            <YoutubeIcon />
          </a>
          <a href="https://instagram.com/techsiocc?igshid=hjblrgji1mce">
            <InstagramIcon />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.cardshop.app&hl=fr&gl=US">
            <ShopIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
