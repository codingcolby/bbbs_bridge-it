import React, { useState } from "react";

function Review(props) {
  const profile = props.profile;
  const [fullName, setFullName] = useState(
    `${profile.first_name} ${profile.last_name}`
  );
  const [age, setAge] = useState(profile.dob_or_age);
  const [address, setAddress] = useState(profile.address);
  const [preference, setPreference] = useState(profile.preference);
  const [race, setRace] = useState(profile.race);
  const [sex, setSex] = useState(profile.sex);
  const [summary, setSummary] = useState(profile.summary);
  return (
    <div>
      <h1>{fullName}</h1>
      <p>{summary}</p>
    </div>
  );
}

export default Review;
