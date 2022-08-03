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

export default function BasicTable({ categories }: any) {
  const [categoriesData, setCategoriesData] = useState<Data[]>([]);
  useEffect(() => {
    setCategoriesData(categories);
  }, [categoriesData && categories]);
  console.log(categories);

  const deleteCat = (id: number) => {
    console.log(id);

    axios
      .delete("http://localhost:3001/category/delete", {
        data: { _id: id },
      })
      .then((res) => {
        if (res.statusText == "OK") {
          axios
            .get("http://localhost:3001/category")
            .then((res) => {
              res.data.data;
            })
            .then((res) => {
              return setCategoriesData(res);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatebutton = () => {
    location.href = "http://localhost:3000/update";
  };
  const insertButton = () => {
    location.href = "http://localhost:3000/insert";
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
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Update</TableCell>
              <TableCell align="center">Insert</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoriesData?.map((each) => (
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
                    onClick={(id) => {
                      deleteCat(each._id);
                    }}
                    variant="contained"
                  >
                    delete
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button onClick={updatebutton} variant="contained">
                    update
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button onClick={insertButton} variant="contained">
                    Insert
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
