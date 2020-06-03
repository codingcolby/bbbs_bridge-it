import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

class MatchTablePage extends Component {
	render() {
		const useStyles = makeStyles((theme) => ({
			root: {
				"& > *": {
					margin: theme.spacing(1),
				},
			},
			table: {
				minWidth: 700,
			},
		}));

		// const classes = useStyles();
		const StyledTableCell = withStyles((theme) => ({
			head: {
				backgroundColor: "green",
				color: theme.palette.common.white,
			},
			body: {
				fontSize: 16,
			},
		}))(TableCell);

		const StyledTableRow = withStyles((theme) => ({
			root: {
				"&:nth-of-type(odd)": {
					backgroundColor: theme.palette.action.hover,
				},
			},
			TableHead: {
				fontSize: 20,
			},
		}))(TableRow);

		// TEMP DATA FOR DEVELOPMENT
		function createData(bocname, lname, matchNY) {
			return { bocname, lname, matchNY };
		}

		const rows = [
			createData("Sam Jones", "Jason Twinada", "(Y)"),
			createData("Sam Jones", "Demonta Miller", "(N)"),
			createData("Sam Jones", "Samuel Xu", "(N)"),
			createData("Sam Jones", "Phil Conway", "(N)"),
			createData("Wilma Franklin", "Maria Torres", "(N)"),
			createData("Wilma Franklin", "Cindy Montenegro", "(Y)"),
			createData("Wilma Franklin", "Kalinda Jones", "(N)"),
			createData("Michael and Tamara Ross", "John Stallo", "(N)"),
			createData("Michael and Tamara Ross", "Devon Michaels", "(N)"),
			createData("Michael and Tamara Ross", "Randy Wilson", "(Y)"),
		];
		// END TEMP DATA FOR DEVELOPMENT

		return (
			<div>
				<h2>Match Table Page</h2>
				<TableContainer component={Paper}>
					<Table className={useStyles.table} aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell>Big or Couple Name</StyledTableCell>
								<StyledTableCell>Little Name</StyledTableCell>
								<StyledTableCell>No Match / Match</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<StyledTableRow key={row.index}>
									<StyledTableCell component="th" scope="row">
										{row.bocname}
									</StyledTableCell>
									<StyledTableCell>{row.lname}</StyledTableCell>
									{/* TODO: functional - associate buttons with boolean value for yes or no on match*/}
									<StyledTableCell>
										<div className={useStyles.root}>
											{row.matchNY} &nbsp; &nbsp;
											<Button variant="outlined">No Match</Button>
											<Button variant="outlined" color="primary">
												Match
											</Button>
										</div>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		);
	}
}

export default connect(mapStoreToProps)(MatchTablePage);
