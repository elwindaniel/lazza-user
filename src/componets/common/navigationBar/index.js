import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  IconButton,
  Link,
  Badge,
  MenuItem,
  Menu,
} from "@material-ui/core";
import { Search, AccountCircle } from "@material-ui/icons";
import Logo from "../../../assets/logo/lazzanewlogo.png";
import "./navigation.css";

import { useHistory } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import MenuIcon from "@material-ui/icons/Menu";

import CloseIcon from "@material-ui/icons/Close";
import { MenuItems } from "./menuItems";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Searchicon from "./searcjh icon/searchicon";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core";
import SessionCheck from "../../../api/SessionCheck";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";

let theme = createMuiTheme();

theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  headerOptions: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    //color: "#eceff1",
    [theme.breakpoints.down("sm")]: {
      //margin: theme.spacing(3),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1.5),
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(3),
    },
  },
  headerIconbutton: {
    marginRight: theme.spacing(1),
    outline: "none",
    [theme.breakpoints.down("xs")]: {
      marginRight: theme.spacing(0),
    },
  },
  navlist: {
    alignItems: "center",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuButton: {
    marginRight: theme.spacing(0),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  dropHeader: {
    //position: "absolute",
    position: "fixed",
    top: "90px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(28, 28, 28, 100%)",
    width: "100%",
    zIndex: 100,
    [theme.breakpoints.down("sm")]: {
      top: "76px",
    },
  },
  small: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
  },
  headerMainContainer: { 
    display: 'flex',
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center"
  },
  headerSecondaryContainer: { 
    display: 'none',
    backgroundColor: 'black', 
    padding: "0 5px 5px 5px",
    width: '100%',
    display: 'none',
    [theme.breakpoints.down("sm")]: {
      display: 'flex'
    },
  },
  webSearch: {
    [theme.breakpoints.down("sm")]: {
      display: 'none'
    },
  },
  searchIconWrapper: {
    [theme.breakpoints.up("sm")]: {
      display: 'none'
    },
  }
}));

function NavigationBar(props) {
  const [show, handleShow] = useState(false);
  const [navbarColor, setNavbarColor] = useState(false);
  let tokenFlag = SessionCheck.checkSession();
  const userDetails = SessionCheck.getLoggedinUserId();
  const userName = userDetails.userName;

  const [isSearchActive, setSearchActive] = useState(false);
  const count = useSelector((state) => state.cartReducer.count);

  const classes = useStyles();

  const searchActiveToggle = (e) => {
    // console.log("Search active ==> ", isSearchActive);
    setSearchActive(!isSearchActive);
  };

  const changeBackground = (e) => {
    if (e !== "undefined") {
      let element = e.path;
      /*if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      // do something at end of scroll
      //console.log("check scroll works ==>", element.scrollHeight);
    } else {
      //console.log("check scroll works ==> false");
    }*/
      //console.log("on shroll is calling", element);
      //console.log("scroll element Y", element[1].scrollY);
      //console.log("scroll element X", element[1].screenX);
      if (element[1].scrollY > 400) {
        setNavbarColor(true);
      } else {
        setNavbarColor(false);
      }
    }
  };

  const history = useHistory();
  //window.addEventListener("scroll", changeBackground, true);

  useEffect(() => {
    window.addEventListener("scroll", changeBackground, true);
  });

  const [isMenuActive, setIsMenuActive] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    {
      tokenFlag ? setAnchorEl(event.currentTarget) : history.push("/login");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfileClose = () => {
    history.push("/myprofile");
    setAnchorEl(null);
  };
  const handleOrderClose = () => {
    history.push("/myprofile/2");
    setAnchorEl(null);
  };
  const handleLogoutClose = () => {
    SessionCheck.removeSession();
    history.push("/");
    setAnchorEl(null);
  };
  // const accountFn = (event) => {
  //   if (tokenFlag) {
  // setAnchorEl(event.currentTarget);
  // history.push("/myprofile");
  //   } else {
  //     history.push("/login");
  //   }
  // };

  const searchIconSection = () => (
    <IconButton
      className={classes.headerIconbutton}
      style={{ color: "#be9621", outline: "none" }}
    >
      <Search onClick={(e) => searchActiveToggle(e)} />
    </IconButton>
  )

  return (
    <nav>
      {/*<AppBar color="transparent" elevation={0}>*/}
      <MuiThemeProvider theme={theme}>
        <div
          className="header"
          style={{
            backgroundColor: "#000000",
            textDecoration: "none",
            top: 0,
            //position: props.background ? "static" : "fixed",
            display: 'flex',
            flexDirection: 'column'
          }}
          onScroll={changeBackground}
        >
          <div className={classes.headerMainContainer}>
            <IconButton onClick={() => history.push("/")} style={{ outline: "none" }}>
              <img src={Logo} alt="" height="60px" />
            </IconButton>

            <div className="header_selection">
              <div className={classes.navlist}>
                <List />
              </div>
              <div className="header_icons">
                {isSearchActive ? (
                  <div className={classes.webSearch}>
                    <Searchicon />
                  </div>
                ) : (
                  searchIconSection()
                )}
                { isSearchActive &&
                  <div className={classes.searchIconWrapper}>
                    { searchIconSection() }
                  </div>
                  }
                <Badge
                  badgeContent={count}
                  color="secondary"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <IconButton
                    style={{ outline: "none", color: "#be9621" }}
                    onClick={() => history.push("/shoppingCart")}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                </Badge>
                <IconButton
                  className={classes.headerIconbutton}
                  style={{ color: "#be9621", outline: "none" }}
                  //onClick={() => history.push("/login")}
                  //onClick={() => accountFn()}
                  onClick={handleClick}
                >
                  {" "}
                  {tokenFlag ? (
                    <PersonOutlineIcon alt={userName} className={classes.small} />
                  ) : (
                    <PersonOutlineIcon fontSize="large" />
                  )}
                </IconButton>
                <IconButton
                  className={classes.menuButton}
                  aria-label="menu"
                  style={{ color: "#be9621", outline: "none" }}
                  onClick={() => {
                    setIsMenuActive(!isMenuActive);
                    //console.log("button==>>", isMenuActive);
                  }}
                >
                  {isMenuActive ? (
                    <CloseIcon fontSize="large" />
                  ) : (
                    <MenuIcon fontSize="large" />
                  )}
                  {/*<MenuIcon />*/}
                </IconButton>
              </div>
            </div>
          </div>
          {isSearchActive && 
            <div className={classes.headerSecondaryContainer}>
              <Searchicon />
            </div>
          }
        </div>
        {/*</AppBar>*/}
        {isMenuActive ? (
          <div
            //className="dropHeader"
            className={classes.dropHeader}
          >
            <List />
          </div>
        ) : null}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleProfileClose}>My Profile</MenuItem>
          <MenuItem onClick={handleOrderClose}>My Order</MenuItem>
          <MenuItem onClick={handleLogoutClose}>Logout</MenuItem>
        </Menu>
      </MuiThemeProvider>
    </nav>
  );
}

export default NavigationBar;

const List = () => {
  const classes = useStyles();
  return (
    <>
      {MenuItems.map((menu, index) => (
        <Link
          href={menu.url}
          className={classes.headerOptions}
          variant="h6"
          style={{
            color: "#eceff1",
            outline: "none",
            textDecoration: "none",
            fontFamily: " Open Sans Condensed",
            textTransform: "uppercase",
          }}
          underline="none"
        >
          {menu.title}
        </Link>
      ))}
    </>
  );
};

{
  /*const MobileList = () => {
  const classes
}*/
}
