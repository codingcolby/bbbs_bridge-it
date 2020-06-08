import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import {
  Button,
  withStyles,
  createStyles,
  InputBase,
  fade,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const customStyles = (theme) =>
  createStyles({
    root: {
      textAlign: "center",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.2),
      },
      marginLeft: 0,
      marginBottom: "200px",
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "inline",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      border: "solid 2px black",
      borderRadius: "12px",
      padding: theme.spacing(1, 1, 1, 10),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "30ch",
        "&:focus": {
          width: "40ch",
        },
      },
    },
  });

class SearchPage extends Component {
  state = {
    searchTerm: "",
  };

  componentDidMount() {
    // load up all information from the server
    this.props.dispatch({
      type: "FETCH_PROFILES",
    });
  }

  changeSearch = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  handleClick = (event) => {
    this.props.dispatch({
      type: "SET_SEARCH",
      payload: this.state.searchTerm,
    });
  };

  render() {
    const { classes } = this.props;
    const profiles = Array.from(this.props.store.profiles);
    const profilesFilter = profiles.filter((item, index) => {
      const profileName = item.first_name + " " + item.last_name;

      if (this.props.store.search) {
        return profileName.indexOf(this.props.store.search) !== -1;
      }

      return true;
    });

    return (
      <div className={classes.root}>
        <h2>Search Page</h2>
        <br />

        <div className={classes.search}>
          <SearchIcon className={classes.searchIcon} />
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={this.changeSearch}
          />

          <Button
            onClick={this.handleClick}
            className={classes.btn}
            variant="outlined"
          >
            Search
          </Button>
        </div>
        <br />
        <div>
          {this.props.store.search &&
            profilesFilter.map((item, index) => (
              <div key={index}>{item.first_name + " " + item.last_name}</div>
            ))}
        </div>
        <Button className={classes.btn} variant="outlined">
          Search By Map
        </Button>
      </div>
    );
  }
}
export default withStyles(customStyles)(connect(mapStoreToProps)(SearchPage));
