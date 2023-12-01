import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography,Container, } from '@material-ui/core';
import decode from 'jwt-decode';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useStyles from "./styles";
   
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    
        navigate('/auth');
    
        setUser(null);
      };

    useEffect(() => {
        const token = user?.token;
    
        if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    
        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);

    return (
    //     
    <AppBar className={classes.appBar} position="static" color="primary">
    <Container className={classes.container}>
      <Link to="/" className={classes.logoContainer}>
        {/* <img className={classes.image} src={Logo} alt="icon" height="60" /> */}
        <Typography className={classes.heading} variant="h4"
        style={{color:"white"}}
        >
            Campus Placement  Information & Training Portal
        </Typography>
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="outlined"
              className={classes.logout}
              color="secondary"
              startIcon={<ExitToAppIcon />}
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="secondary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </Container>
  </AppBar>
    )
}

export default Navbar