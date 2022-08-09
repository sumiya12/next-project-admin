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

const Insert = () => {
  const router = useRouter();
  const [data, setData] = useState();
  const [textValue, setTextValue] = useState();
  const insertButton = (e) => {
    e.preventDefault();

    const firstname = e.target[0].value;
    console.log(firstname);
    const lastname = e.target[2].value;
    console.log(lastname);
    const email = e.target[4].value;
    console.log(email);
    const address = e.target[6].value;
    console.log(address);
    const phone_number = e.target[8].value;
    console.log(phone_number);
    const rode_id = e.target[10].value;
    console.log(rode_id);

    axios
      .post("http://localhost:3001/user", {
        firstname,
        lastname,
        email,
        address,
        phone_number,
        rode_id,
      })
      .then((res) => {
        console.log(res.statusText);
      })
      .catch((err) => {
        console.log("error in request", err);
      });
    router.push("/user");
  };
  const handleclick = () => {
    router.push("/user");
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
            label="firstname"
            variant="outlined"
            name="firstname"
          />
          <TextField
            id="filled-basic"
            name="lastname"
            label="lastname"
            variant="outlined"
          />
          <TextField
            id="standard-basic"
            name="email"
            label="email"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="address"
            variant="outlined"
            name="address"
          />
          <TextField
            id="filled-basic"
            name="phone_number"
            label="phone_number"
            variant="outlined"
          />
          <TextField
            id="standard-basic"
            name="rode_id"
            label="rode_id"
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

export default Insert;
