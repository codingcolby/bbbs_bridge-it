import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { withStyles, createStyles } from "@material-ui/core";
import swal from "@sweetalert/with-react";

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

    td: {
      textAlign: "left",
    },

    th: {
      textAlign: "left",
    },

    containerz: {
      zIndex: "2",
      position: "relative",
      paddingTop: "10vh",
      color: "#FFFFFF",
      paddingBottom: "200px",
    },

    ...styles,
  });

class MatchTablePage extends Component {
  state = {
    match: "",
    review: "",
    comment: "",
  };

  componentDidMount() {
    this.props.dispatch({ type: "FETCH_TABLE" });
  }

  handleUpsert = () => {
    swal("Comments:", {
      content: "input",
    }).then((value) => {
      swal(`Saved Comments: ${value}`);
      this.setState({
        comment: this.state.value,
      });
      this.props.dispatch({
        type: "UPSERT_TABLE",
        payload: {
          newMatch: this.state.match,
          newReview: this.state.review,
          newComment: this.state.comment,
        },
      });
    });
  };

  onClick = () => {
    swal({
      text:
        "Please confirm your Match selection below, or cancel and return to the Match Table",
      buttons: {
        catch: {
          text: "It's a Match!",
          value: "match",
          color: "green",
        },

        nomatch: {
          text: "No Match",
        },
        cancel: "Cancel",
      },
    }).then((value) => {
      switch (value) {
        case "nomatch":
          swal(
            "So many Littles, so many Bigs",
            "You'll find a match soon!",
            "error"
          );
          this.setState({
            match: false,
          });
          this.props.dispatch({
            type: "UPSERT_TABLE",
            payload: {
              newMatch: this.state.match,
              newReview: this.state.review,
              newComment: this.state.comment,
            },
          });
          break;
        case "match":
          swal(
            "Hooray",
            "Congratulations on a successful Big/Little match!",
            "success"
          );
          this.setState({
            match: true,
          });
          this.props.dispatch({
            type: "UPSERT_TABLE",
            payload: {
              newMatch: this.state.match,
              newReview: this.state.review,
              newComment: this.state.comment,
            },
          });
          break;

        default:
          swal(
            "No changes made",
            "You can safely return to the Match Table and make your selection",
            "info"
          );
      }
    });
  };

  render() {
    const { classes } = this.props;
    //const table = this.props.store.table;
    // const bigName = table.filter((item, index) => {
    // 	return (
    // 		(item.profile_type === 1 || 3) && item.first_name + " " + item.last_name
    // 	);
    // });

    // const littleName = table.filter((item, index) => {
    // 	return item.profile_type === 2 && item.first_name + " " + item.last_name;
    // });

    const handleReturn = () => {
      this.props.history.push("/search");
    };

    const tableRowElements = this.props.store.table.map((item, index) => {
      console.log(item);
      return (
        <tr>
          <td>{item.big_name}</td>
          <td>{item.little_name}</td>
          {/* Capitalize the review status */}
          <td>{item.review.charAt(0).toUpperCase() + item.review.slice(1)}</td>
          <td>
            <Button
              onClick={this.handleUpsert}
              round
              style={{ backgroundColor: "black" }}
              size="sm"
              className="matchselect"
            >
              Review Comments
            </Button>
          </td>
          <td>
            {item.match === null || item.match === false ? (
              <Button
                onClick={this.onClick}
                round
                style={{ backgroundColor: "black" }}
                size="sm"
                className="matchselect"
              >
                Select Match Status
              </Button>
            ) : (
              <p>Matched!</p>
            )}
          </td>
        </tr>
      );
    });

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
                    <h1>Complete a Match!</h1>
                  </CardHeader>
                  <CardBody>
                    <div>
                      <table>
                        <thead>
                          <tr>
                            <th>Big or Couple Name</th>
                            <th>Little Name</th>
                            <th>Match Assessement</th>
                            <th>Comments</th>
                            <th>Match / No Match</th>
                          </tr>
                        </thead>
                        <tbody>{tableRowElements}</tbody>
                      </table>
                    </div>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      onClick={handleReturn}
                      color="success"
                      round
                      size="lg"
                      style={{ backgroundColor: "black" }}
                    >
                      Return to Name Search
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

export default withStyles(customStyles)(
  connect(mapStoreToProps)(MatchTablePage)
);
