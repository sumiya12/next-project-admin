import axios from "axios";
import React, { useState, useEffect } from "react";
import router, { useRouter } from "next/router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import NativeSelect from "@mui/material/NativeSelect";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
export default function cat({ Users, role }) {
  const router = useRouter();
  const [categoriesData, setCategoriesData] = useState();

  const [roles, setRoles] = useState("");
  console.log(Users);
  const handleChange = (event) => {
    setRoles(event.target.value);
  };

  //   console.log(Users);
  useEffect(() => {
    setCategoriesData(Users);
  }, [categoriesData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e);

    const firstname = e.target[0].value;
    const lastname = e.target[1].value;
    const email = e.target[2].value;
    const address = e.target[3].value;
    const phone_number = e.target[4].value;
    const rode_id = e.target[5].value;
    const id = Users.id;

    axios
      .put("http://localhost:3001/user", {
        firstname,
        lastname,
        email,
        address,
        phone_number,
        rode_id,
        id,
      })
      .then((res) => console.log(res.statusText))
      .catch((error) => console.error(error));
    router.push("/user");
  };
  // console.log(category && category);
  //   console.log(role);
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
          defaultValue={Users[0].firstname}
          name="namee"
          label="Name"
          variant="standard"
        />

        <TextField
          id="standard-basic"
          defaultValue={Users[0].lastname}
          label="price"
          name="price"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          defaultValue={Users[0].email}
          label="ingredients"
          name="ingredients"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          defaultValue={Users[0].address}
          label="category_id"
          name="category_id"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          defaultValue={Users[0].phone_number}
          label="category_id"
          name="category_id"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          defaultValue={Users[0].rode_id}
          label="category_id"
          name="category_id"
          variant="standard"
        />
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Role
          </InputLabel>
          <NativeSelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={Users[0].role_name}
            // value={roles}
            label="Role"
            onChange={handleChange}
            inputProps={{
              name: "Role",
              id: "uncontrolled-native",
            }}
          >
            {role?.map((r) => {
              return <option key={r.rode_id}>{r.role_name}</option>;
            })}
          </NativeSelect>
        </FormControl>

        <Button type="submit" variant="contained">
          Update user
        </Button>
      </Box>
    </>
  );
}
const callUser = axios.get("http://localhost:3001/user");
const callRole = axios.get("http://localhost:3001/role");

export async function getStaticPaths() {
  //   console.log("staticpath");
  const [role, users] = await Promise.all([callRole, callUser]);
  //   console.log(role.data);
  //   console.log(user.data);
  return {
    fallback: false,
    paths: users.data.data.map((user) => ({
      params: { id: user.id.toString() },
    })),

    // paths: { params: {} },
  };
}

export async function getStaticProps({ params }) {
  //   console.log(params.id);
  const res = await axios.get(`http://localhost:3001/user/${params.id}`);
  const res1 = await axios.get(`http://localhost:3001/role`);
  const [userid, role] = await Promise.all([res, res1]);
  return {
    props: {
      Users: userid.data.data,
      role: role.data.data,
    },
  };
}
