import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import Map from "../../components/Map/Map";
import {
	Button,
	Card,
	CardContent,
	Checkbox,
	Container,
	FormControlLabel,
	FormGroup,
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
	valuetext = (value) => {
		return `${value}`;
	};

	valueLabelFormat = (value) => {
		return marks.findIndex((mark) => mark.value === value) + 1;
	};

	render() {
		const handleClick = () => {
			this.props.history.push("/profile");
		};

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
									<FormGroup>
										<FormControlLabel
											control={<Checkbox name="Interests" />}
											label="Interests"
										/>
										<FormControlLabel
											control={<Checkbox name="Preferences" />}
											label="Preferences"
										/>
									</FormGroup>
								</CardContent>
							</Card>
							<Button variant="outlined" onClick={handleClick}>
								Profile View
							</Button>
						</Grid>
						<Grid item xs={12} sm={4} md={4}>
							<h1>Big Name</h1>
							<Card>
								<CardContent>Littles name</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</div>
		);
	}
}

export default connect(mapStoreToProps)(MapListPage);
