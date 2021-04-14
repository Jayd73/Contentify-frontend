import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
  },
}));

function UserDataTable({ headingRow, rows }) {
  const classes = useStyles();

  const setHeading = () => (
    <TableRow>
      {Object.values(headingRow).map((val) => (
        <TableCell key={val.id} style={{ fontWeight: "bold" }}>
          {val}
        </TableCell>
      ))}
    </TableRow>
  );

  const setRows = (row) =>
    Object.values(row).map((val) => <TableCell>{val}</TableCell>);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>{setHeading()}</TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>{setRows(row)}</TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserDataTable;
