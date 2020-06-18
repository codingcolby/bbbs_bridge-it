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
import "./Table.css";

const customStyles = (theme) =>
  createStyles({
    root: {
      textAlign: "center",
    },
    card: {
      width: "83vw",
      height: "60vh",
    },

    tr: {
      borderBottom: "5px",
      borderColor: "solid black",
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
    cardbody: {
      overflow: "scroll",
    },
    center: {
      textAlign: "center",
    },
    ...styles,
  });

class MatchTablePage extends Component {
  state = {
    match: "",
    review: "",
    comment: "",
    big_id: "",
    little_id: "",
  };

  componentDidMount() {
    this.props.dispatch({ type: "FETCH_TABLE" });
  }

  handleComment = () => {
    const currentComment = this.props.store.table.map((item, index) => {
      return <p key={index}>item.comment</p>;
    });

    swal({
      title: "Comments:",
      text: `{ currentComment }`,
      content: "input",
    }).then((value) => {
      swal(`Saved Comments: ${value}`);
      this.setState({
        comment: this.state.value,
      });
      this.props.dispatch({
        type: "UPDATE_MATCH_STATUS",
        payload: {
          comment: this.state.comment,
          big_id: this.state.big_id,
          little_id: this.state.little_id,
        },
      });
    });
  };

  onClick = (big_id, little_id, comment) => (event) => {
    swal({
      text:
        "Please confirm your Match selection below, or cancel and return to the Match Table",
      buttons: {
        catch: {
          text: "It's a Match!",
          value: true,
          color: "green",
        },

        nomatch: {
          text: "No Match",
          value: false,
        },
        cancel: "Cancel",
      },
    }).then((value) => {
      if (value === null)
        return swal(
          "No changes made",
          "You can safely return to the Match Table and make your selection",
          "info"
        );
      const payload = {
        big_id: big_id,
        little_id: little_id,
        comment: comment,
        match: value, // true/false from swal select
      };
      this.props.dispatch({
        type: "UPDATE_MATCH_STATUS",
        payload,
      });
      switch (value) {
        case false:
          swal(
            "So many Littles, so many Bigs",
            "You'll find a match soon!",
            "error"
          );
          break;
        case true:
          swal(
            "Hooray",
            "Congratulations on a successful Big/Little match!",
            "success"
          );
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

    //event handler for navigating to search page
    const handleReturn = () => {
      this.props.history.push("/search");
    };

    const tableRowElements = this.props.store.table.map((item, index) => {
      return (
        <tr key={index} className={classes.tr}>
          <td>{item.big_name}</td>
          <td>{item.little_name}</td>
          {/* Capitalize the review status */}
          <td>{item.review.charAt(0).toUpperCase() + item.review.slice(1)}</td>
          <td>{item.comment}</td>
          <td className={classes.center}>
            {item.match === null || item.match === false ? (
              <Button
                fullWidth
                onClick={this.onClick(
                  item.big_id,
                  item.little_id,
                  item.comment
                )}
                round
                style={{ backgroundColor: "black" }}
                size="sm"
                className="matchselect"
              >
                Select Match Status
              </Button>
            ) : (
              <Button
                fullWidth
                color="success"
                disabled
                round
                size="sm"
                className="matchselect"
              >
                Matched
              </Button>
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
              <GridItem xs={12} sm={12} md={10}>
                <Card className={classes.card}>
                  <CardHeader color="success" className={classes.cardHeader}>
                    <h1>Complete a Match!</h1>
                  </CardHeader>
                  <CardBody className={classes.cardbody}>
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
