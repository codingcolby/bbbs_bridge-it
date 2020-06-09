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
import swal from "@sweetalert/with-react";
// //import swal from "sweetalert";

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

class MatchTablePage extends Component {
  onClick = () => {
    swal({
      text:
        "Please confirm your Match selection below, or cancel and return to the Match Table",
      buttons: {
        cancel: "Cancel",
        catch: {
          text: "It's a Match!",
          value: "match",
        },

        nomatch: true,
      },
    }).then((value) => {
      switch (value) {
        case "nomatch":
          swal("So many Littles, so many Bigs", "You'll find a match soon!");
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
            "No changes made - You can safely return to the Match Table and make your selection"
          );
      }
    });
  };

  render() {
    // TEMP DATA FOR DEVELOPMENT
    function createData(bocname, lname, matchNY) {
      return { bocname, lname, matchNY };
    }

    const rows = [
      createData("Temp Data - Sam Jones", "Jason Twinada", "false"),
      createData("Temp Data - Sam Jones", "Demonta Miller", "false"),

      createData("Temp Data - Wilma Franklin", "Maria Torres", "false"),
      createData("Temp Data - Wilma Franklin", "Kalinda Jones", "false"),

      createData(
        "Temp Data - Michael and Tamara Ross",
        "Jason Twinada",
        "false"
      ),
      createData(
        "Temp Data - Michael and Tamara Ross",
        "Demonta Miller",
        "false"
      ),
      createData(
        "Temp Data - Michael and Tamara Ross",
        "Maria Torres",
        "false"
      ),
      createData(
        "Temp Data - Michael and Tamara Ross",
        "Kalinda Jones",
        "false"
      ),
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

                  <StyledTableCell>
                    <div className={useStyles.root}>
                      {row.matchNY} &nbsp; &nbsp;
                      <Button onClick={this.onClick} variant="outlined">
                        No Match
                      </Button>{" "}
                      &nbsp; &nbsp;
                      <Button
                        onClick={this.onClick}
                        variant="outlined"
                        color="primary"
                      >
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
