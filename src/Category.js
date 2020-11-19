import React, { useState, useEffect } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import config from './config.json';
import Product from './Product';

function Category(props) {

  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);

  useEffect(() => {
  	if (props.id === 'All') {
	    fetch(config.easyFruitApiUrl + '/shop/products/?limit=1000')
	    .then(response => response.json())
	    .then(data => {
	      setProducts(data.products);
	      setVisibleProducts(data.products);
	    });
  	}
  	else {
	    fetch(config.easyFruitApiUrl + props.url)
	    .then(response => response.json())
	    .then(data => {
	      setProducts(data.products);
	      setVisibleProducts(data.products);
	    });
  	}
  }, [props.url, props.id]);

  const [value, setValue] = React.useState([]);

  return (
  	<div>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item>
        	{props.id}
        </Grid>
        <Grid item>
		  	  <Autocomplete
			      id="combo-box-demo"
			      options={[...products].sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))}
			      getOptionLabel={(option) => option.name}
			      onChange={(event, newValue) => {
			      	setValue(newValue);
			      	if (newValue) {
			      		setVisibleProducts([newValue]);
			      	}
			      	else {
			      		setVisibleProducts(products);
			      	}
			      }}
			      style={{ width: 300 }}
			      renderInput={(params) => <TextField {...params} label="Plase type a product" variant="outlined" />}
			    />
        </Grid>
      </Grid>
	    <div>
	      {
	        visibleProducts.map((product, index) => {
	        	return <Product url={product.product_url} key={(product.product_url + '-' + index)}
	        		setEasyFruitsHistory={props.setEasyFruitsHistory}
	        	></Product>
	        })
	      }
	    </div>
    </div>
  );
}

export default Category;