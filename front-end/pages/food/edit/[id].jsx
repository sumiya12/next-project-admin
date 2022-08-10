import axios from "axios";
import React, { useState, useEffect } from "react";
import router, { useRouter } from "next/router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import NativeSelect from "@mui/material/NativeSelect";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export default function cat({ foods, cate }) {
  const router = useRouter();
  const [categoriesData, setCategoriesData] = useState();
  const [category, setCategory] = useState("");
  console.log(foods);
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

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
    const id = foods[0].id;
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
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Category
          </InputLabel>
          <NativeSelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={foods[0].name}
            // value={category}
            label="category_id"
            onChange={handleChange}
            inputProps={{
              name: "Category",
              id: "uncontrolled-native",
            }}
          >
            {cate?.map((r) => {
              return (
                <option value={r._id} key={r._id}>
                  {r.name}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
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

const callFood = axios.get("http://localhost:3001/food");
const callCat = axios.get("http://localhost:3001/category");

export async function getStaticPaths() {
  const [food, cat] = await Promise.all([callFood, callCat]);
  // const res = await axios.get("http://localhost:3001/food");
  //   console.log(res.data);
  //   console.log("staticpath");
  return {
    fallback: false,
    paths: food.data.data.map((food) => ({
      params: { id: food.id.toString() },
    })),
    // paths: { params: {} },
  };
}

export async function getStaticProps({ params }) {
  const callFood = await axios.get(`http://localhost:3001/food/${params.id}`);
  const callCat = await axios.get("http://localhost:3001/category");
  const [foodid, cat] = await Promise.all([callFood, callCat]);
  console.log(cat);

  return {
    props: {
      foods: foodid.data.data,
      cate: cat.data.data,
    },
  };
}
