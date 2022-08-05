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
  id: number;
  namee: String;
  price: number;
  ingredients: string;
  category_id: number;
  stock: number;
  portion: number;
  image: string;
  tumb_img: string;
  discount: number;
  sales: number;
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
            .then((d) => setCategoriesData(d))
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
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">price</TableCell>
            <TableCell align="center">ingredients</TableCell>
            <TableCell align="center">category_id</TableCell>
            <TableCell align="center">stock</TableCell>
            <TableCell align="center">portion</TableCell>
            <TableCell align="center">image</TableCell>
            <TableCell align="center">tumb_img</TableCell>
            <TableCell align="center">discount</TableCell>
            <TableCell align="center">sales</TableCell>
            <TableCell align="center">Delete</TableCell>
            <TableCell align="center">Update</TableCell>
            <TableCell align="center">Insert</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categoriesData?.map((each) => (
            <TableRow
              key={each.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {each.id}
              </TableCell>
              <TableCell align="center">{each.namee}</TableCell>
              <TableCell align="center">{each.price}</TableCell>
              <TableCell align="center">{each.ingredients}</TableCell>
              <TableCell align="center">{each.category_id}</TableCell>
              <TableCell align="center">{each.stock}</TableCell>
              <TableCell align="center">{each.portion}</TableCell>
              <TableCell align="center">{each.image}</TableCell>
              <TableCell align="center">{each.tumb_img}</TableCell>
              <TableCell align="center">{each.discount}</TableCell>
              <TableCell align="center">{each.sales}</TableCell>
              <TableCell align="center">
                <Button
                  onClick={(id) => {
                    deleteCat(each.id);
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
  );
}