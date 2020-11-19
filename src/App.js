import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import config from './config.json';
import './App.css';
import TabPanel from './TabPanel';
import Category from './Category';
import ProductDetails from './ProductDetails';

const drawerWidth = 200;

function App(props) {

  const { window1 } = props;

  const [categories, setCategories] = useState([]);
  const [easyFruitsHistory, setEasyFruitsHistory] = useState([]);
  const [showBack, setShowBack] = useState(false);
  const [mountAgain, setMountAgain] = useState(false);

  useEffect(() => {
    fetch(config.easyFruitApiUrl + '/shop/categories/')
    .then(response => response.json())
    .then(data => data.categories)
    .then(items => {
      items = items
      .filter(category => category.name && category.name !== '<string>')
      items.unshift({ name: 'All' });
      setCategories(items);

      setShowBack(false);
    });

    setEasyFruitsHistory((localStorage.getItem('easyFruitsHistory')
      && JSON.parse(localStorage.getItem('easyFruitsHistory'))) || []);
  }, [mountAgain]);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      // marginTop: 48,
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop: 64,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const goBack = () => {
    setMountAgain(!mountAgain);
    window.history.back();
  }

  const container = window1 !== undefined ? () => window1().document.body : undefined;

  const drawer = (
    <span>
    <h2>HISTORY</h2>
    <List>
      {easyFruitsHistory.map((product, index) => (
        <ListItem button key={product.name + '-' + index}>
          <ListItemText primary={product.name} />
        </ListItem>
      ))}
    </List>
    </span>
  );

  return (
    <div className="App">
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          { showBack && (<IconButton key={999} label='Back' index={999} onClick={goBack}
              style={{fontSize: '0.875rem', color: "white"}}
            >
              <ArrowBackIcon style={{fill: "white"}} />&nbsp;&nbsp;BACK
            </IconButton>) }
          {
            !showBack && categories.map((category, index) => {
              return <Tab key={index} label={category.name} index={index} {...a11yProps(index)} />
            })
          }
          </Tabs>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content} style={{marginTop: 64}}>

        <Router>
          <Switch>
            <Route path="/shop/products/" component={props =>
              <ProductDetails props={props} setShowBack={setShowBack} />}>
            </Route>
            <Route path="/">
              {
                categories.map((category, index) => {
                  return <TabPanel key={index} value={value} index={index}>
                    <Category id={category.name} url={category.category_url}
                      setEasyFruitsHistory={setEasyFruitsHistory}
                    >
                    </Category>
                  </TabPanel>
                })
              }
            </Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
