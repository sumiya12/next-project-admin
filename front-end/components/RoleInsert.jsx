import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FormGroup } from "@mui/material";
import { useRouter } from "next/router";

// type Data = {
//   _id: number,
//   name: string,
//   color: string,
//   _v: number,
// };

const RoleInsert = () => {
  const router = useRouter();
  const [data, setData] = useState();
  const [textValue, setTextValue] = useState();
  const insertButton = (e) => {
    e.preventDefault();

    const role_name = e.target[0].value;
    console.log(role_name);
    const role_description = e.target[2].value;
    console.log(role_description);
    

    axios
      .post("http://localhost:3001/role", {
        role_name,
        role_description,
       
      })
      .then((res) => {
        console.log(res.statusText);
      })
      .catch((err) => {
        console.log("error in request", err);
      });
    router.push("/role");
  };
  const handleclick = () => {
    router.push("/role");
  };

  return (
    <Container fixed>
      <Button onClick={handleclick} variant="contained">
        back
      </Button>
      <FormGroup>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={insertButton}
        >
          <TextField
            id="outlined-basic"
            label="role_name"
            variant="outlined"
            name="role_name"
          />
          <TextField
            id="filled-basic"
            name="role_description"
            label="role_description"
            variant="outlined"
          />
          <Button type="submit" variant="contained">
            Insert
          </Button>
        </Box>
      </FormGroup>
    </Container>
  );
};

export default RoleInsert;
