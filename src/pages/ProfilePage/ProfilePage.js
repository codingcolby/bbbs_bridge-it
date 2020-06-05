import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import PersonCard from "../../components/PersonCard/PersonCard";
import {
	withStyles,
	createStyles,
	makeStyles,
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
	render() {
		const { classes } = this.props;

		const handleClick = () => {
			this.props.history.push("/list");
		};

		return (
			<div className={classes.root}>
				<div className={classes.column}>
					<PersonCard />
					<br />
					<Button variant="outlined" onClick={handleClick}>
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
					<PersonCard />
				</div>
			</div>
		);
	}
}
export default withStyles(customStyles)(connect(mapStoreToProps)(ProfilePage));
