import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import Map from "../../components/Map/Map";
import * as Scroll from "react-scroll";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

import {
  Button,
  Card,
  CardContent,
  Radio,
  Container,
  FormControlLabel,
  RadioGroup,
  Grid,
  Slider,
  withStyles,
  createStyles,
} from "@material-ui/core";

const marks = [
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 15,
    label: "15",
  },
  {
    value: 20,
    label: "20",
  },
];

class MapListPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_PROFILES",
    });
  }
  valuetext = (value) => {
    return `${value}`;
  };

  valueLabelFormat = (value) => {
    return marks.findIndex((mark) => mark.value === value) + 1;
  };

  render() {
    const handleClick = () => {
      this.props.history.push(`/profile/${id}`);
    };

    const id = Number(this.props.match.params.id);
    const profiles = this.props.store.profiles;

    const profilesBigFilter = profiles.filter((item, index) => {
      return item.id === id;
    });

    const profilesLittlesFilter = profiles.filter((item, index) => {
      return item.profile_type === 2;
    });

    console.log(profilesLittlesFilter);

    return (
      <div>
        <Container maxWidth={false}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={8}>
              <Map />
              <Slider
                defaultValue={5}
                valueLabelFormat={this.valueLabelFormat}
                getAriaValueText={this.valuetext}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
              />

              <Card>
                <CardContent>
                  <RadioGroup>
                    <FormControlLabel
                      control={<Radio name="Interests" />}
                      label="Interests"
                    />
                    <FormControlLabel
                      control={<Radio name="Preferences" />}
                      label="Preferences"
                    />
                  </RadioGroup>
                </CardContent>
              </Card>
              <Button variant="outlined" onClick={handleClick}>
                Profile View
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <div>
                {profilesBigFilter.map((item, index) => {
                  return (
                    <div key={index}>
                      <h1>{item.first_name + " " + item.last_name}</h1>
                      <h3>
                        {"Age: " + item.dob_or_age + " " + "Race: " + item.race}
                      </h3>
                      <h3>{"Address: " + item.address}</h3>
                    </div>
                  );
                })}
              </div>
              <Element
                name="littles-list"
                className="element"
                style={{
                  position: "relative",
                  height: "540px",
                  overflow: "scroll",
                  marginBottom: "100px",
                }}
              >
                <div>
                  {profilesLittlesFilter.map((item, index) => {
                    return (
                      <Card key={index}>
                        <CardContent>
                          <div>
                            <h3>{item.first_name + " " + item.last_name}</h3>
                            <h4>
                              {"Age: " +
                                item.dob_or_age +
                                " " +
                                "Race: " +
                                item.race}
                            </h4>
                            <p>{item.summary}</p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </Element>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MapListPage);
