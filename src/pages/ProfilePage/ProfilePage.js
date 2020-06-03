import React from "react";
import PersonCard from "../../components/PersonCard/PersonCard";
import { makeStyles, Button, IconButton } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const useStyles = makeStyles((theme) => ({
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
  btn: {
    paddingTop: "15px",
  },
}));

function ProfilePage(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.column}>
        <PersonCard />
        <br />
        <Button className={classes.btn}>Map View</Button>
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
        <PersonCard />
      </div>
    </div>
  );
}

export default ProfilePage;
