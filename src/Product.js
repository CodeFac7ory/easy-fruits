import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import config from './config.json';

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
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  link: {
    display: 'inline-block',
    width: '100%',
  }
}));

function Product(props) {

  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(config.easyFruitApiUrl + props.url)
    .then(response => response.json())
    .then(data => {
      setProduct(data);
    })
  }, [props.url]);

  const classes = useStyles();

  const addDefaultSrc = (ev) => {
    ev.preventDefault();
    ev.target.src = 'https://wiki.sc4devotion.com/images/6/62/Wiki_no_image.png';
  };

  const openProductDetailsClick = (product) => {

    let easyFruitsHistory = (localStorage.getItem('easyFruitsHistory')
      && JSON.parse(localStorage.getItem('easyFruitsHistory'))) || [];
    easyFruitsHistory.unshift(product);
    localStorage.setItem('easyFruitsHistory', JSON.stringify(easyFruitsHistory));

    props.setEasyFruitsHistory(easyFruitsHistory);
  };

  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item>
            <ButtonBase className={classes.image}>
            <Link to={props.url} className={classes.link} onClick={() => openProductDetailsClick(product)}>
              <img className={classes.img} alt="Not Available"
                src={config.easyFruitApiUrl + props.url + '/photo'}
                onError={addDefaultSrc}
              />
            </Link>
            </ButtonBase>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1">
              <Link to={props.url} className={classes.link} onClick={() => openProductDetailsClick(product)}>
                {product.name}
              </Link>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="body2">
              <Link to={props.url} className={classes.link} onClick={() => openProductDetailsClick(product)}>
                {product.price ? '€ ' + parseFloat(product.price).toFixed(2) : null}
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Product;