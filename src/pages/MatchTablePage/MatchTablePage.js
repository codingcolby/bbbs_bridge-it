import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import swal from "@sweetalert/with-react";
import "./Table.css";
import { response } from "express";
import { BottomNavigationAction } from "@material-ui/core";
// import Button from "@material-ui/core/Button";
// import { withStyles, makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import tablehea from "@material-ui/core/tablehea";
// import tr from "@material-ui/core/tr";
// import Paper from "@material-ui/core/Paper";

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		"& > *": {
// 			margin: theme.spacing(72),
// 		},
// 	},
// 	width: 90,
// }));

// const td = withStyles((theme) => ({
// 	head: {
// 		backgroundColor: "green",
// 		color: theme.palette.common.white,
// 	},
// 	body: {
// 		fontSize: 16,
// 	},
// }))(TableCell);

// const Styledtr = withStyles((theme) => ({
// 	root: {
// 		"&:nth-of-type(odd)": {
// 			backgroundColor: theme.palette.action.hover,
// 		},
// 	},
// 	tablehea: {
// 		fontSize: 20,
// 	},
// }))(tr);

class MatchTablePage extends Component {
	componentDidMount() {
		this.props.dispatch({ type: "FETCH_TABLE" });
	}

	onClick = () => {
		swal({
			text:
				"Please confirm your Match selection below, or cancel and return to the Match Table",
			buttons: {
				catch: {
					text: "It's a Match!",
					value: "match",
					color: "green",
				},

				nomatch: {
					text: "No Match",
				},
				cancel: "Cancel",
			},
		}).then((value) => {
			switch (value) {
				case "nomatch":
					swal(
						"So many Littles, so many Bigs",
						"You'll find a match soon!",
						"error"
					);
					break;
				case "match":
					swal(
						"Hooray",
						"Congratulations on a successful Big/Little match!",
						"success"
					);
					break;

				default:
					swal(
						"No changes made",
						"You can safely return to the Match Table and make your selection",
						"info"
					);
			}
		});
	};

	render() {
		//	const id = Number(this.props.match.params.id);
		const table = this.props.store.table;

		const tableBig = table.filter((item, index) => {
			return item.first_name, item.last_name;
			//	return item.id === id;
		});

		const tableLittles = table.filter((item, index) => {
			return item.first_name, item.last_name;
			//	return item.id === id;
		});

		return (
			<div>
				<h2>Match Selection Table</h2>
				<table className="tablecontainer">
					<thead>
						<tr>
							<th>Big or Couple Name</th>
							<th>Little Name</th>
							<th className="centered">No Match / Match</th>
						</tr>
					</thead>
					<tbody>
						<div>
							<tr>
								{tableBig.map((item, index) => {
									return (
										<td key={index}>
											{item.first_name + " " + item.last_name} Sample Big Name
										</td>
									);
								})}
								{tableLittles.map((item, index) => {
									return (
										<td key={index}>
											{item.first_name + " " + item.last_name} Sample Little
											Name
										</td>
									);
								})}
								<td>
									<button
										onClick={this.onClick}
										variant="outlined"
										className="matchselect">
										Select Match Status
									</button>
								</td>
							</tr>
						</div>
					</tbody>
				</table>
			</div>
		);
	}
}

export default connect(mapStoreToProps)(MatchTablePage);
