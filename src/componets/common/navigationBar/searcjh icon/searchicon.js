//import React from 'react'
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import { user } from "../../../../api/constants";
import Axios from "../../../../api/axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.50),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  root: {
    width: "100%"
  }
}));

export default function Searchicon() {
  const classes = useStyles();
  const history = useHistory();
  const [search, setSearch] = useState("");
  function handle(e) {
    setSearch(e.target.value);
    // showsearchview();
  }
  const showsearchview = (search) => history.push("/search/" + search);
  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon} >
          <SearchIcon style={{ color: "#ffa726", outline: "none" }} />
        </div>
        <form onSubmit={() => showsearchview(search)}>
          <InputBase
            placeholder="Search Products"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            value={search}
            onChange={(e) => handle(e)}


          />
        </form>
      </div>
    </div>
  );
}
