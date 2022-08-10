import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FormGroup } from "@mui/material";
import { useRouter } from "next/router";
import NativeSelect from "@mui/material/NativeSelect";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
// type Data = {
//   _id: number,
//   name: string,
//   color: string,
//   _v: number,
// };

const Foodinsert = ({ cate }) => {
  const router = useRouter();
  const [data, setData] = useState();
  const [textValue, setTextValue] = useState();
  const [category, setCategory] = useState();

  const catid = parseInt(category);
  console.log(typeof catid);
  const handleChange = (event) => {
    console.log(event.target);

    setCategory(event.target.value);
  };
  const insertButton = (e) => {
    e.preventDefault();
    console.log(e);
    const namee = e.target[0].value;
    const price = e.target[2].value;
    const ingredients = e.target[4].value;
    const category_id = catid;
    const stock = e.target[7].value;
    const portion = e.target[9].value;
    const image = e.target[11].value;
    const tumb_img = e.target[13].value;
    const discount = e.target[15].value;
    const sales = e.target[17].value;
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
          <FormControl fullWidth>
            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
              Category
            </InputLabel>
            <NativeSelect
              variant="outlined"
              id="demo-simple-select"
              // defaultValue={foods[0].name}
              value={catid}
              label="category_id"
              onChange={handleChange}
              inputProps={{
                name: "Category",
                id: "uncontrolled-native",
              }}
            >
              {cate?.map((r) => {
                return (
                  <option variant="outlined" value={r._id} key={r._id}>
                    {r.name}
                  </option>
                );
              })}
            </NativeSelect>
          </FormControl>
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
