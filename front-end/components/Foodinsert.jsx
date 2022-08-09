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

const Foodinsert = () => {
  const router = useRouter();
  const [data, setData] = useState();
  const [textValue, setTextValue] = useState();
  const insertButton = (e) => {
    e.preventDefault();  
	const namee = e.target[0].value;
	const price = e.target[2].value;
	const ingredients = e.target[4].value;
	const category_id = e.target[6].value;
	const stock = e.target[8].value;
	const portion = e.target[10].value;
	const image = e.target[12].value;
	const tumb_img = e.target[14].value; 
	const discount = e.target[16].value;
	const sales = e.target[18].value;
    axios
      .post("http://localhost:3001/food", {
        namee,
        price,
        ingredients,
        category_id,
        stock,
        portion,
        image,
        tumb_img,
        discount,
        sales,
       
      })
      .then((res) => {
        console.log(res.statusText);
      })
      .catch((err) => {
        console.log("error in request", err);
      });
    router.push("/food");
  };
  const handleclick = () => {
    router.push("/food");
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
            label="namee"
            variant="outlined"
            name="namee"
          />
         
          <TextField
            id="outlined-basic"
            label="price"
            variant="outlined"
            name="price"
          />
          <TextField
            id="filled-basic"
            name="ingredients"
            label="ingredients"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="category_id"
            variant="outlined"
            name="category_id"
          />
          <TextField
            id="filled-basic"
            name="stock"
            label="stock"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="portion"
            variant="outlined"
            name="portion"
          />
          <TextField
            id="filled-basic"
            name="image"
            label="image"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="tumb_img"
            variant="outlined"
            name="tumb_img"
          />
          <TextField
            id="filled-basic"
            name="discount"
            label="discount"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="sales"
            variant="outlined"
            name="sales"
          />
          <Button type="submit" variant="contained">
            Insert
          </Button>
        </Box>
      </FormGroup>
    </Container>
  );
};

export default Foodinsert;
