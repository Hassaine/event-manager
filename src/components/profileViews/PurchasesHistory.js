import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchBuyedLicence,
//   selectAllProducts,
// } from '../../features/licenceSlice';
// import { getUser } from '../../features/userSlice';
// import datejs from 'datejs';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export default function PurchasesHistory() {
  const classes = useStyles();

  // const user = useSelector(getUser);
  const dispatch = useDispatch();

  const products = useSelector((state) => state.licence.products);
  const licences = useSelector((state) => state.licence.licences);
  // console.log(licences);

  useEffect(() => {
    if (
      products.length !== 0 &&
      JSON.stringify(licences) === JSON.stringify({})
    ) {
      for (let index = 0; index < products.length; index++) {
        const product = products[index];
        // dispatch(
        //   fetchBuyedLicence({ token: "user.token", product_id: product._id })
        // );
      }
    }
  }, []);
  return (
    <List className={classes.root} subheader={<li />}>
      {products &&
        products?.map((product) => (
          <li key={`section-${product?._id}`} className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader>{product.name}</ListSubheader>
              {licences[product?._id]?.map((licence) => (
                <ListItem key={`item-${licence._id}`}>
                  <ListItemText
                    primary={`Code : ${licence.code}`}
                    secondary={new Date(licence.createdAt).toString()}
                  />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
    </List>
  );
}
