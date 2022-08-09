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

type Data = {
  id: Number;
  firstname: String;
  lastname: String;
  email: String;
  address: String;
  phone_number: String;
  rode_id: number;
};

export default function BasicTable({ users }: any) {
  const [categoriesData, setCategoriesData] = useState();
  useEffect(() => {
    setCategoriesData(users);
  }, [categoriesData]);
  //   console.log(categories);
  const router = useRouter();

  //   const deleteCat = (id: number) => {
  //     axios
  //       .delete("http://localhost:3001/category/delete", {
  //         data: { _id: id },
  //       })
  //       .then((res) => {
  //         if (res.statusText == "OK") {
  //           axios
  //             .get("http://localhost:3001/category")
  //             .then((res) => {
  //               res.data.data;
  //             })
  //             .then((d) => setCategoriesData(d))
  //             .catch((err) => {
  //               console.log(err);
  //             });
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  const getId = (id: Number) => {
    router.push(`/user/edit/${id}`);
  };

  //   const updatebutton = () => {
  //     location.href = "http://localhost:3000/update";
  //   };
  const insertButton = () => {
    router.push(`/insert`);
  };
  return (
    <Container fixed>
      <Button onClick={insertButton} variant="contained">
        Insert
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">firstname</TableCell>
              <TableCell align="center">lastname</TableCell>
              <TableCell align="center">email</TableCell>
              <TableCell align="center">address</TableCell>
              <TableCell align="center">phone_number</TableCell>
              <TableCell align="center">rode_id</TableCell>
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoriesData?.map((each: any) => (
              <TableRow
                key={each.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {each._id}
                </TableCell>
                <TableCell align="center">{each.firstname}</TableCell>
                <TableCell align="center">{each.lastname}</TableCell>
                <TableCell align="center">{each.email}</TableCell>
                <TableCell align="center">{each.address}</TableCell>
                <TableCell align="center">{each.phone_number}</TableCell>
                <TableCell align="center">{each.rode_id}</TableCell>
                <TableCell align="center">
                  <Button
                    // onClick={() => {
                    //   deleteCat(each._id);
                    // }}
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
    </Container>
  );
}
