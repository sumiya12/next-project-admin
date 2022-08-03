import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FormGroup } from "@mui/material";

// type Data = {
//   _id: number,
//   name: string,
//   color: string,
//   _v: number,
// };

const Insert = () => {
  const [data, setData] = useState();
  const [textValue, setTextValue] = useState();
  const insertButton = (e) => {
    e.preventDefault();
    // console.log(e.target[4].value);
    const name = e.target[0].value;
    const color = e.target[2].value;
    const _v = e.target[4].value;

    axios
      .post("http://localhost:3001/category/insert", {
        name: name,
        color: color,
        _v: _v,
      })
      .then((res) => {
        console.log("res", res.res.data);
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };

  const back = () => {
    location.href = "http://localhost:3000/category";
  };

  return (
    <Container fixed>
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
            label="insert name"
            variant="outlined"
            name="name"
          />
          <TextField
            id="filled-basic"
            name="color"
            label="Insert color"
            variant="outlined"
          />
          <TextField
            id="standard-basic"
            name="_v"
            label="Insert _v"
            variant="outlined"
          />
          <Button type="submit" onClick={back} variant="contained">
            back
          </Button>
          <Button type="submit" variant="contained">
            Insert
          </Button>
        </Box>
      </FormGroup>
    </Container>
  );
};

export default Insert;
