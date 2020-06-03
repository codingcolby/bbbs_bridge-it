import React from "react";
import PersonCard from "../../components/PersonCard/PersonCard";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  column: {
    display: "inline-block",
  },
}));

function ProfilePage(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.column}>
        <PersonCard />
      </div>
      <div className={classes.column}>
        <PersonCard />
      </div>
    </div>
  );
}

export default ProfilePage;
