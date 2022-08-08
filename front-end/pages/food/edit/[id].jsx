import axios from "axios";
import React, { useState, useEffect } from "react";
import router, { useRouter } from "next/router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
export default function cat({ foods }) {
  const router = useRouter();
  const [categoriesData, setCategoriesData] = useState();
  console.log(foods);
  useEffect(() => {
    setCategoriesData(foods);
  }, [categoriesData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    const namee = e.target[0].value;
    const price = e.target[1].value;
    const ingredients = e.target[2].value;
    const category_id = e.target[3].value;
    const stock = e.target[4].value;
    const portion = e.target[5].value;
    const image = e.target[6].value;
    const tumb_img = e.target[7].value;
    const discount = e.target[8].value;
    const sales = e.target[9].value;
    const id = foods.id;

    axios
      .put("http://localhost:3001/food", {
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
        id,
      })
      .then((res) => console.log(res.statusText))
      .catch((error) => console.error(error));
    router.push("/food");
  };
  // console.log(category && category);

  return (
    <>
      <h1 style={{ color: "black" }}>One category</h1>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          defaultValue={foods[0].namee}
          name="namee"
          label="Name"
          variant="standard"
        />

        <TextField
          id="standard-basic"
          defaultValue={foods[0].price}
          label="price"
          name="price"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          defaultValue={foods[0].ingredients}
          label="ingredients"
          name="ingredients"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          defaultValue={foods[0].category_id}
          label="category_id"
          name="category_id"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          defaultValue={foods[0].stock}
          label="stock"
          name="stock"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          defaultValue={foods[0].portion}
          label="portion"
          name="portion"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          defaultValue={foods[0].image}
          label="image"
          name="image"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          defaultValue={foods[0].tumb_img}
          label="tumb_img"
          name="tumb_img"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          defaultValue={foods[0].discount}
          label="discount"
          name="discount"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          defaultValue={foods[0].sales}
          label="sales"
          name="sales"
          variant="standard"
        />
        <Button type="submit" variant="contained">
          Update food
        </Button>
      </Box>
    </>
  );
}
export async function getStaticPaths() {
  //   console.log("staticpath");
  const res = await axios.get("http://localhost:3001/food");
  //   console.log(res.data);
  //   console.log("staticpath");
  return {
    fallback: false,
    paths: res.data.data.map((food) => ({
      params: { id: food.id.toString() },
    })),
    // paths: { params: {} },
  };
}

export async function getStaticProps({ params }) {
  //   console.log(params.id);
  const res = await axios.get(`http://localhost:3001/food/${params.id}`);
  return {
    props: {
      foods: res.data.data,
    },
  };
}
