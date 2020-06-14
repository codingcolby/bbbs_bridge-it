import React, { useState } from "react";
import { Button, makeStyles, TextField } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: "bold",
  },
  info: {
    display: "inline",
  },
}));

function Review(props) {
  const profile = props.profile;
  const [firstName, setFirstName] = useState(profile.first_name);
  const [lastName, setLastName] = useState(profile.last_name);
  const [age, setAge] = useState(profile.dob_or_age);
  const [address, setAddress] = useState(profile.address);
  const [preference, setPreference] = useState(profile.preference);
  const [race, setRace] = useState(profile.race);
  const [sex, setSex] = useState(profile.sex);
  const [summary, setSummary] = useState(profile.summary);
  const [editMode, setEditMode] = useState(false);
  const fullName = `${firstName} ${lastName}`;

  // toggle edit mode
  const toggleEditMode = (event) => {
    setEditMode(!editMode);
  };

  // edit first name
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    props.profile.first_name = event.target.value;
  };

  // edit last name
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    props.profile.last_name = event.target.value;
  };

  // edit age
  const handleAgeChange = (event) => {
    setAge(event.target.value);
    props.profile.dob_or_age = event.target.value;
  };

  // edit address
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    props.profile.address = event.target.value;
  };

  // edit race
  const handleRaceChange = (event) => {
    setRace(event.target.value);
    props.profile.race = event.target.value;
  };

  // edit sex
  const handleSexChange = (event) => {
    setSex(event.target.value);
    props.profile.sex = event.target.value;
  };

  // edit summary
  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
    props.profile.summary = event.target.value;
  };

  const handlePreferenceChange = (property) => (event) => {
    setPreference({
      ...preference,
      [property]: event.target.value,
    });
    props.profile.preference = {
      ...profile.preference,
      [property]: event.target.value,
    };
  };

  const classes = useStyles();

  const typeText = profile.profile_type !== 2 ? "Big" : "Little";

  // TODO: Re-order to match MapListPage
  const infoElement = editMode ? (
    <div>
      <TextField
        onChange={handleFirstNameChange}
        value={firstName}
        label="First Name"
        fullWidth
      />
      <TextField
        onChange={handleLastNameChange}
        value={lastName}
        label="Last Name"
        fullWidth
      />
      <TextField
        onChange={handleAgeChange}
        value={age}
        label="Age"
        type="number"
        fullWidth
      />
      {/*
      Sex will need selection
      <p>
        <span className={classes.label}>Sex: </span>
        <TextField onChange={handleSexChange} value={sex} label="Sex" />
      </p> */}
      <TextField
        onChange={handleAddressChange}
        value={address}
        label="Address"
        fullWidth
      />
      <TextField
        onChange={handleRaceChange}
        value={race}
        label="Ethnicity"
        fullWidth
      />
    </div>
  ) : profile.profile_type !== 2 ? (
    <div>
      <p>
        <span className={classes.label}>Age: </span>
        {age}
      </p>
      <p>
        <span className={classes.label}>Sex: </span>
        {sex}
      </p>
      <p>
        <span className={classes.label}>Address: </span>
        {address}
      </p>
      <p>
        <span className={classes.label}>Ethnicity: </span>
        {race}
      </p>
    </div>
  ) : (
    <p>Little Info</p>
  );
  const preferencesElement = editMode ? (
    <div>
      <TextField
        onChange={handlePreferenceChange("age")}
        value={preference.age}
        label="Age"
        fullWidth
      />
      <TextField
        onChange={handlePreferenceChange("race")}
        value={preference.race}
        label="Ethnicity"
        fullWidth
      />
      <TextField
        onChange={handlePreferenceChange("religion")}
        value={preference.religion}
        label="Religion"
        fullWidth
      />
      <TextField
        onChange={handlePreferenceChange("speak_english")}
        value={preference.speak_english}
        label="P doesn't speak english"
        fullWidth
      />
      <TextField
        onChange={handlePreferenceChange("lvl_of_problems")}
        value={preference.lvl_of_problems}
        label="Level of problems"
        fullWidth
      />
    </div>
  ) : profile.profile_type !== 2 ? (
    <div>
      <p>
        <span className={classes.label}>Age: </span>
        {preference.age}
      </p>
      <p>
        <span className={classes.label}>Ethnicity: </span>
        {preference.race}
      </p>
      <p>
        <span className={classes.label}>Religion: </span>
        {preference.religion}
      </p>
      <p>
        <span className={classes.label}>P doesn't speak english: </span>
        {preference.speak_english}
      </p>
      <p>
        <span className={classes.label}>Level of problems: </span>
        {preference.lvl_of_problems}
      </p>
    </div>
  ) : (
    <p>Little Pref</p>
  );

  const summaryElement = editMode ? (
    <TextField
      onChange={handleSummaryChange}
      value={summary}
      label="Summary"
      fullWidth
      multiline
    />
  ) : (
    <p>{summary}</p>
  );
  return (
    <div>
      <h1>{fullName}</h1>
      <h2>Personal Information:</h2>
      {infoElement}
      <h2>Preferences:</h2>
      {preferencesElement}
      <h2>Summary:</h2>
      {summaryElement}
      {editMode ? (
        <Button fullWidth onClick={toggleEditMode}>
          Save These Changes
        </Button>
      ) : (
        <Button fullWidth onClick={toggleEditMode}>
          Edit This {typeText}'s Details
        </Button>
      )}
    </div>
  );
}

export default Review;
