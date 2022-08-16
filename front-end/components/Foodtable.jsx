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
import { useRouter } from "next/router";

// type Data = {
//   id: number;
//   namee: String;
//   price: number;
//   ingredients: string;
//   category_id: number;
//   stock: number;
//   portion: number;
//   image: string;
//   tumb_img: string;
//   discount: number;
//   sales: number;
// };

export default function Foodtable({ categories }) {
  const [categoriesData, setCategoriesData] = useState();
  const router = useRouter();

  useEffect(() => {
    setCategoriesData(categories);
  }, [categoriesData && categories]);
  // console.log(categories);

  const deleteCat = (id) => {
    // console.log(id);

    axios
      .delete("http://localhost:3001/food", {
        data: { id },
      })
      .then((res) => {
        if (res.statusText == "OK") {
          axios
            .get("http://localhost:3000/food")
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
    router.push(`/food`);
  };
  const getId = (id) => {
    router.push(`/food/edit/${id}`);
  };

  // const updatebutton = () => {
  //   location.href = "http://localhost:3000/update";
  // };
  const insertButton = () => {
    router.push(`/foodinsert`);
  };
  const logOutButton = () =>{
    
  }
  return (
    <>
      <Button onClick={insertButton} variant="contained">
        Insert
      </Button>
      <Button onClick={logOutButton} variant="contained">
        logout
      </Button>
      <TableContainer
        component={Paper}
        sx={{
          width: "95vw",
          display: "flex",
          alignItems: "center",
          paddingLeft: "50px",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">price</TableCell>
              <TableCell align="center">ingredients</TableCell>
              <TableCell align="center">category_id</TableCell>
              <TableCell align="center">category_name</TableCell>
              <TableCell align="center">stock</TableCell>
              <TableCell align="center">portion</TableCell>
              <TableCell align="center">image</TableCell>
              <TableCell align="center">tumb_img</TableCell>
              <TableCell align="center">discount</TableCell>
              <TableCell align="center">sales</TableCell>
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Update</TableCell>
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
                <TableCell align="center">{each.name}</TableCell>
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
                  <Button
                    onClick={() => {
                      getId(each.id);
                    }}
                    variant="contained"
                  >
                    update
                  </Button>
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
