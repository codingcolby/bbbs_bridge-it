import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import swal from "@sweetalert/with-react";
// import "./Table.css";

import { withStyles, createStyles, Paper } from "@material-ui/core";
import Footer from "../../material-kit/components/Footer/Footer.js";
import Button from "../../material-kit/components/CustomButtons/Button.js";
import image from "../../material-kit/assets/img/kc.jpg";
import styles from "../../material-kit/assets/jss/material-kit-react/views/loginPage.js";
import Card from "../../material-kit/components/Card/Card.js";
import CardBody from "../../material-kit/components/Card/CardBody.js";

// import { BottomNavigationAction } from "@material-ui/core";
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

const customStyles = (theme) =>
  createStyles({
    ...styles,
  });

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
    const { classes } = this.props;
    // const id = Number(this.props.match.params.id);
    // const table = this.props.store.table;

    // const tableBig = table.filter((item, index) => {
    // 	return item.id === id, item.first_name, item.last_name;
    // });

    // const tableLittles = table.filter((item, index) => {
    // 	return item.id === id, item.first_name, item.last_name;
    // });

    return (
      <div>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <Card>
            <h2>Match Selection Table</h2>
            <table className="tablecontainer">
              <thead>
                <tr>
                  <th>Big or Couple Name</th>
                  <th>Little Name</th>
                  <th className="centered">Match / No Match</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sam Jones</td>
                  <td>Jason Twinada</td>
                  {/* {tableBig.map((item, index) => {
									return (
										<td key={index}>
											{item.first_name + " " + item.last_name}
										</td>
									);
								})}
								{tableLittles.map((item, index) => {
									return (
										<td key={index}>
											{item.first_name + " " + item.last_name}
										</td>
									);
								})} */}
                  <td className="centered">
                    <Button
                      onClick={this.onClick}
                      round
                      style={{ backgroundColor: "black" }}
                      size="md"
                      className="matchselect"
                    >
                      Select Match Status
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>Sam Jones</td>
                  <td>Demonta Miller</td>
                  {/* {tableBig.map((item, index) => {
									return (
										<td key={index}>
											{item.first_name + " " + item.last_name}
										</td>
									);
								})}
								{tableLittles.map((item, index) => {
									return (
										<td key={index}>
											{item.first_name + " " + item.last_name}
										</td>
									);
								})} */}
                  <td className="centered">
                    <Button
                      onClick={this.onClick}
                      round
                      style={{ backgroundColor: "black" }}
                      size="md"
                      className="matchselect"
                    >
                      Select Match Status
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(customStyles)(
  connect(mapStoreToProps)(MatchTablePage)
);
