import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import PersonCard from "../../components/PersonCard/PersonCard";
import {
  withStyles,
  createStyles,
  // makeStyles,
  Button,
  IconButton,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const customStyles = (theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },
    column: {
      display: "inline-block",
    },
    btnCol: {
      display: "inline-flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingLeft: "15px",
      paddingRight: "15px",
    },
  });

class ProfilePage extends Component {
  state = {
    big_id: "",
    little_id: "",
    match: "",
    review: "",
    comment: "",
  };

  render() {
    const { classes } = this.props;
    const id = Number(this.props.match.params.id);
    const handleClick = () => {
      this.props.history.push(`/list/${id}`);
    };

    const likelyClick = () => {
      console.log("Likely");
      // this.setState(review.value);
    };

    const maybeClick = () => {
      console.log("Maybe");
      // this.setState(review.value);
    };

    const unlikelyClick = () => {
      console.log("Unlikely");
      // this.setState(review.value);
    };

    const addCommentsClick = () => {
      console.log("Wants to add comments");
    };

    //TO DO - convert to dispatch
    // 		reviewupsert ()
    // *** this query for reference only
    // 		INSERT INTO "status"
    //     ("big_id", "little_id", "match", "review", "comment")
    // VALUES
    //     ($1, $2, $3, $4, $5)
    // ON CONFLICT ON CONSTRAINT unique_relationship_key
    // DO
    // UPDATE SET
    // "match" = $3, "review" = $4, "comment" = $5;

    return (
      <div className={classes.root}>
        <div className={classes.column}>
          <h3>Anchor Person</h3>
          <PersonCard />
          <br />
          <Button
            variant="outlined"
            className={classes.button}
            onClick={handleClick}
          >
            Map List View
          </Button>
        </div>
        <div className={classes.btnCol}>
          <IconButton>
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton>
            <ArrowDownwardIcon />
          </IconButton>
        </div>
        <div className={classes.column}>
          <h3>Match Candidate Card Series</h3>

          <PersonCard />
          <br />
          <div className={classes.button}>
            <Button variant="outlined" onClick={likelyClick} value="3">
              Likely
            </Button>
            <Button variant="outlined" onClick={maybeClick} value="2">
              Maybe
            </Button>
            <Button variant="outlined" onClick={unlikelyClick} value="1">
              Unlikely
            </Button>
            {/* Input for comments? */}
            <Button variant="outlined" onClick={addCommentsClick}>
              Add Comments
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(customStyles)(connect(mapStoreToProps)(ProfilePage));
