import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// prettier-ignore
import { Container, Hidden, List, ListItem, Menu, MenuItem, IconButton, Typography, Toolbar, AppBar, Badge, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: 'var(--mainDark)',
  },
  navLink: {
    fontSize: '1.5rem',
    color: 'var(--mainLight)',
    textDecoration: 'none',
    textTransform: 'capitalize',
    '&:hover': {
      color: 'var(--mainBlue)',
    },
  },
  navLinkMenu: {
    color: 'var(--mainDark)',
    textDecoration: 'none',
    textTransform: 'capitalize',
  },
  menuButton: {
    fontSize: '2.5rem',
    marginRight: theme.spacing(1),
  },
  title: {
    fontSize: '2.3rem',
    flexGrow: 1,
  },
  navDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  navbarDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -5,
    top: -8,
    fontSize: '1rem',
    padding: '0 1px',
  },
}))(Badge);

export default function MenuAppBar() {
  const { userInfo } = useSelector((state) => state.auth);
  const [toggleLink, setToggleLink] = useState('login');
  const { items } = useSelector((state) => state.cart);
  const numInCart = items.length || 0;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const links = [
    { name: 'products', path: '/' },
    { name: 'cart', path: '/cart' },
    { name: toggleLink, path: `/${toggleLink}` },
  ];
  useEffect(() => {
    if (userInfo) {
      return setToggleLink('logout');
    }
    return setToggleLink('login');
  }, [userInfo]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.navbar} position="static">
        <Toolbar>
          <Container maxWidth="lg" className={classes.navbarDisplayFlex}>
            <Link className={classes.navLink} to="/">
              <Typography
                variant="h6"
                className={`text-title ${classes.title}`}
              >
                Tom's Vinyl <i className="fas fa-compact-disc" />
              </Typography>
            </Link>

            <Hidden smDown>
              <List
                component="nav"
                aria-labelledby="main navigation"
                className={classes.navDisplayFlex}
              >
                {links.map(({ name, path }) => (
                  <Link to={path} key={name} className={classes.navLink}>
                    {name === 'cart' ? (
                      <ListItem button>
                        <span style={{ marginRight: '5px' }}>{name}</span>
                        <StyledBadge
                          badgeContent={numInCart}
                          color="secondary"
                        />
                      </ListItem>
                    ) : (
                      <ListItem button>{name}</ListItem>
                    )}
                  </Link>
                ))}
              </List>
            </Hidden>

            <Hidden mdUp>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <i className={`fas fa-bars ${classes.menuButton}`} />
                  <StyledBadge badgeContent={numInCart} color="secondary" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  keepMounted
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  {links.map(({ name, path }) => {
                    return (
                      <Link
                        key={name}
                        to={path}
                        className={classes.navLinkMenu}
                      >
                        {name === 'cart' ? (
                          <MenuItem
                            style={{ fontSize: '1.6rem' }}
                            onClick={handleClose}
                          >
                            <span style={{ marginRight: '5px' }}>{name}</span>
                            <StyledBadge
                              badgeContent={numInCart}
                              color="secondary"
                            />
                          </MenuItem>
                        ) : (
                          <MenuItem
                            style={{ fontSize: '1.6rem' }}
                            onClick={handleClose}
                          >
                            {name}
                          </MenuItem>
                        )}
                      </Link>
                    );
                  })}
                </Menu>
              </div>
            </Hidden>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}
