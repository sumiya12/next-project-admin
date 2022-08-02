import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

type Data = {
  _id: number;
  name: string;
  color: string;
  _v: number;
};

export default function BasicTable() {
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/category/get")
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteCat = (id: number) => {
    console.log(id);

    axios
      .delete("http://localhost:3001/category/delete", {
        data: { id: id },
      })
      .then((res) => {
        console.log(res.statusText);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container fixed>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Color</TableCell>
              <TableCell align="center">_v</TableCell>
              <TableCell align="center">Buttons</TableCell>
              <TableCell align="center">Buttons</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((each) => (
              <TableRow
                key={each.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {each._id}
                </TableCell>
                <TableCell align="center">{each.name}</TableCell>
                <TableCell align="center">{each.color}</TableCell>
                <TableCell align="center">{each._v}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      deleteCat(each._id);
                    }}
                    variant="contained"
                  >
                    delete
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained">update</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
