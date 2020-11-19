import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import config from './config.json';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    marginBottom: '10px',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  appbar: {
    // alignItems: 'center',
    position: 'relative',
    zIndex: theme.zIndex.drawer + 1,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    marginTop: 48,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: 48,
  },
}));

function ProductDetails(props) {

  const [product, setProduct] = useState([]);

  useEffect(() => {
    props.setShowBack(true);

    fetch(config.easyFruitApiUrl + window.location.pathname)
    .then(response => response.json())
    .then(data => {
      setProduct(data);
    })
  }, [props]);

  const classes = useStyles();

  const addDefaultSrc = (ev) => {
    ev.preventDefault();
    ev.target.src = 'https://wiki.sc4devotion.com/images/6/62/Wiki_no_image.png';
  };

  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item>
            <img className={classes.img} alt="Not Available"
              src={config.easyFruitApiUrl + window.location.pathname + '/photo'}
              onError={addDefaultSrc}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1">
              {product.name}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="body2">
              {product.price ? '€ ' + parseFloat(product.price).toFixed(2) : null}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default ProductDetails;