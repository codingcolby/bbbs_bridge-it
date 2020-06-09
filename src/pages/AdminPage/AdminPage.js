import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

import swal from "@sweetalert/with-react";

import RegistrationPage from "../RegisterPage/RegisterPage";
import UserPage from "../UserPage/UserPage";

import {
	Button,
	Container,
	Paper,
	withStyles,
	createStyles,
} from "@material-ui/core";

const customStyles = (theme) =>
	createStyles({
		paper: {
			maxWidth: "45%",
			backgroundColor: "black",
			color: "white",
			padding: "4%",
			margin: "4%",
		},
		btn: {
			"backgroundColor": "green",
			"color": "#fff",
			"margin": "5.5%",
			"fontFamily": "Trebuchet",
			"&:hover": {
				background: "red",
			},
		},
		font: {
			fontFamily: "Trebuchet",
		},
	});

class AdminPage extends Component {
	state = {
		email: "",
		password: "",
	};

	handleInputChangeFor = (propertyName) => (event) => {
		this.setState({
			[propertyName]: event.target.value,
		});
	};
	git;

	handleInputChangeFor = (propertyName) => (event) => {
		this.setState({
			[propertyName]: event.target.value,
		});
	};

	componentDidUpdate() {
		if (this.props.store.resetReducer) {
			this.props.dispatch({ type: "CLEAR_RESET" });
		}
	}
	onClick = () => {
		swal({
			text: "Are you sure?",
			buttons: {
				reset: {
					text: "Yes",
					value: "reset",
				},
				cancel: "No",
			},
		}).then((value) => {
			switch (value) {
				case "reset":
					swal("Ready to Reset?", "Reset User!", "success");
					this.props.dispatch({
						type: "RESET_PASSWORD",
						payload: {
							...this.props.match.params,
							newEmail: this.state.email,
							newPassword: this.state.password,
							id: this.props.store.id,
						},
					});
					break;
				default:
					swal("Reset cancelled", "No changes made", "info");
			}
		});
	};

	// Need to RESET USER with USERNAME AND PASSWORD RESET!!
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.roots}>
				<center>
					<Paper className={classes.paper}>
						<Container>
							<h1 className={classes.font}>Admin</h1>
							<div>
								<label htmlFor="email" className={classes.font}>
									Email:
									<input
										type="text"
										name="email"
										value={this.state.email}
										onChange={this.handleInputChangeFor("email")}
									/>
								</label>
							</div>
							<div>
								<label htmlFor="password">
									Password:
									<input
										type="password"
										name="password"
										value={this.state.password}
										onChange={this.handleInputChangeFor("password")}
									/>
								</label>
								<label htmlFor="user_logged_in" className={classes.font}>
									<UserPage />
								</label>
							</div>
							<div>
								<Button
									className={classes.btn}
									type="submit"
									name="submit"
									value="Reset User"
									onClick={this.onClick}
									// onClick={() => {
								>
									Reset User
								</Button>
							</div>
							<div></div>
						</Container>
					</Paper>
					<div>
						<Paper variant="outlined">
							<Container>
								<RegistrationPage />
							</Container>
						</Paper>
					</div>
				</center>
			</div>
		);
	}
}

export default withStyles(customStyles)(connect(mapStoreToProps)(AdminPage));
