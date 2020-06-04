import React, { Component } from "react";
import {
  Card,
  CardContent,
  withStyles,
  createStyles,
  Typography,
} from "@material-ui/core";
import { render } from "react-dom";
// import {
//   Link,
//   DirectLink,
//   Element,
//   Events,
//   animateScroll,
//   scrollSpy,
//   scroller,
// } from "react-scroll";

const customStyles = (theme) =>
  createStyles({
    root: {
      display: "inline-flex",
      height: "75vh",
      width: "50vh",
    },
    content: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      textAlign: "center",
    },
    notHeader: {
      flexGrow: "1",
      display: "flex",
      flexDirection: "column",
    },
    innerHeader: {
      marginTop: "16px",
    },
    details: {
      flexGrow: "1",
      backgroundColor: "lightgrey", // SKELETON ONLY REMOVE
      color: "white", // SKELETON ONLY REMOVE
      height: "10px",
      width: "100%",
      overflow: "scroll",
    },
    summary: {
      flexGrow: "2",
      backgroundColor: "silver", // SKELETON ONLY REMOVE
      color: "white", // SKELETON ONLY REMOVE
      height: "10px",
      width: "100%",
      overflow: "scroll",
    },
  });

/**
 * TODO: Inherit details from props
 */
class PersonCard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Typography className={classes.header} component="h4">
            Person Name
          </Typography>
          <div className={classes.notHeader}>
            {/* Scrolling Details */}
            <div className={classes.details}>details</div>

            <Typography
              className={`${classes.header} ${classes.innerHeader}`}
              component="h4"
            >
              Summary
            </Typography>

            {/* Scrolling Summary */}
            <div className={classes.summary}>
              Summary <br /> Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Curabitur id felis metus. Vestibulum et pulvinar tortor.
              Morbi pharetra lacus ut ex molestie blandit. Etiam et turpis sit
              amet risus mollis interdum. Suspendisse et justo vitae metus
              bibendum fringilla sed sed justo. Aliquam sollicitudin dapibus
              lectus, vitae consequat odio elementum eget. Praesent efficitur
              eros vitae nunc interdum, eu interdum justo facilisis. Sed
              pulvinar nulla ac dignissim efficitur. Quisque eget eros metus.
              Vestibulum bibendum fringilla nibh a luctus. Duis a sapien metus.
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(customStyles)(PersonCard);
