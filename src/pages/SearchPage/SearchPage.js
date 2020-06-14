import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import {
  withStyles,
  createStyles,
  InputBase,
  fade,
  Chip,
  Grid,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

// core components
import Footer from "../../material-kit/components/Footer/Footer.js";
import GridContainer from "../../material-kit/components/Grid/GridContainer.js";
import GridItem from "../../material-kit/components/Grid/GridItem.js";
import Card from "../../material-kit/components/Card/Card.js";
import CardBody from "../../material-kit/components/Card/CardBody.js";
import CardHeader from "../../material-kit/components/Card/CardHeader.js";
import CardFooter from "../../material-kit/components/Card/CardFooter.js";
import image from "../../material-kit/assets/img/kc.jpg";
import Button from "../../material-kit/components/CustomButtons/Button.js";

import styles from "../../material-kit/assets/jss/material-kit-react/views/loginPage.js";

const customStyles = (theme) =>
  createStyles({
    root: {
      textAlign: "center",
    },
    card: {
      width: "60vw",
      height: "60vh",
    },
    containerz: {
      zIndex: "2",
      position: "relative",
      paddingTop: "10vh",
      color: "#FFFFFF",
      paddingBottom: "200px",
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
      marginBottom: "50px",
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    ul: {
      listStyleType: "none",
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
    ...styles,
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

  handleSearchClick = (event) => {
    this.props.dispatch({
      type: "SET_SEARCH",
      payload: this.state.searchTerm,
    });
  };

  handleNameClick = (id) => (event) => {
    console.log(id);

    this.props.dispatch({
      type: "SET_SELECTED_PROFILES",
      payload: id,
    });
    this.props.history.push(`/list/${id}`);
  };

  render() {
    const { classes } = this.props;
    const profiles = this.props.store.profiles;
    const profilesFilter = profiles.filter((item, index) => {
      const profileName = item.first_name + " " + item.last_name;
      const lowerProfileName = profileName.toLowerCase();
      if (this.props.store.search) {
        return (
          lowerProfileName.indexOf(this.props.store.search.toLowerCase()) !== -1
        );
      }

      return true;
    });

    const handleClick = () => {
      this.props.history.push("/map");
    };

    return (
      <div>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <div className={classes.containerz}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={7}>
                <Card className={classes.card}>
                  <CardHeader color="success" className={classes.cardHeader}>
                    <h1>Search for Profiles!</h1>
                  </CardHeader>
                  <CardBody>
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
                        onClick={this.handleSearchClick}
                        className={classes.btn}
                        round
                        style={{
                          backgroundColor: "black",
                          marginLeft: "15px",
                        }}
                      >
                        Search
                      </Button>
                    </div>

                    <div>
                      <Grid container spacing={1} direction="row">
                        {this.props.store.search &&
                          profilesFilter.map((item, index) => (
                            <Grid item key={index} xs={2}>
                              <Chip
                                onClick={this.handleNameClick(item.id)}
                                label={item.first_name + " " + item.last_name}
                              />
                            </Grid>
                          ))}
                      </Grid>
                    </div>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      onClick={handleClick}
                      color="success"
                      round
                      size="lg"
                      style={{ backgroundColor: "black" }}
                    >
                      Search By Map
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}
export default withStyles(customStyles)(connect(mapStoreToProps)(SearchPage));
