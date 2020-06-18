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
    switch (property) {
      case "max_distance_miles":
        // datatype number
        setPreference({
          ...preference,
          [property]: Number(event.target.value),
        });
        props.profile.preference = {
          ...profile.preference,
          [property]: event.target.value,
        };
        break;
      default:
        setPreference({
          ...preference,
          [property]: event.target.value,
        });
        props.profile.preference = {
          ...profile.preference,
          [property]: event.target.value,
        };
        break;
    }
  };

  const classes = useStyles();

  const typeText = profile.profile_type !== 2 ? "Big" : "Little";

  // TODO: Re-order to match MapListPage
  const infoElement = editMode ? (
    profile.profile_type !== 2 ? (
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
    ) : (
      profile.profile_type ==
      2(
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
      )
    )
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
  );

  const preferencesElement = editMode ? (
    profile.profile_type !== 2 ? (
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
        <TextField
          onChange={handlePreferenceChange("max_distance_miles")}
          type="number"
          value={preference.max_distance_miles}
          label="Max distance (miles)"
          fullWidth
        />
      </div>
    ) : (
      profile.profile_type ==
      2(
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
            onChange={handlePreferenceChange("sexuality")}
            value={preference.sexuality}
            label="Sexuality"
            fullWidth
          />
          <TextField
            onChange={handlePreferenceChange("smoking_drinking")}
            value={preference.smoking_drinking}
            label="Smoking/Drinking"
            fullWidth
          />
          <TextField
            onChange={handlePreferenceChange("children")}
            value={preference.children}
            label="Have children of their own at home:"
            fullWidth
          />
          <TextField
            onChange={handlePreferenceChange("pets")}
            value={preference.pets}
            label="Pets"
            fullWidth
          />
          <TextField
            onChange={handlePreferenceChange("weapons")}
            value={preference.weapons}
            label="Firearms/Weapons in home"
            fullWidth
          />
        </div>
      )
    )
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
        <span className={classes.label}>Sexuality: </span>
        {preference.sexuality}
      </p>
      <p>
        <span className={classes.label}>Smoking/Drinking: </span>
        {preference.smoking_drinking}
      </p>
      <p>
        <span className={classes.label}>
          "Have children of their own at home:":
        </span>
        {preference.children}
      </p>
      <p>
        <span className={classes.label}>Pets: </span>
        {preference.pets}
      </p>
      <p>
        <span className={classes.label}>Weapons: </span>
        {preference.weapons}
      </p>
    </div>
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
