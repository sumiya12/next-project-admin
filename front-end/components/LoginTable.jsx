import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { FormGroup, Box, TextField, Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

const LoginTable = () => {
  const router = useRouter();
  const [temp, setTemp] = useState();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const handleSumbit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.Password.value;
    console.log(email);
    console.log(password);
    axios
      .post("http://localhost:3001/api/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.success === true) {
          router.push("/food");
          const users = {
            data : res.data.data,
            token : res.data.token
          }
          setUser(users);
        } else {
          console.log(res.data.message, "----");
          setTemp(res.data.message);
        }
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };
  console.log(user,'state -ees');
  

useEffect(()=>{
  localStorage.setItem("user", JSON.stringify(user));
  // localStorage.setItem("token", JSON.stringify(token));
},[user,token])
 

  const handleClick = () => {
    router.push("/register");
  };

  return (
    <div>
      <Container fixed>
        <pre>{JSON.stringify(temp)}</pre>
        <FormGroup>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "20ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSumbit}
          >
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              name="Password"
            />
            <Button variant="outlined" type="submit">
              Login
            </Button>
            <Button variant="outlined" onClick={handleClick}>
              Register
            </Button>
          </Box>
        </FormGroup>
      </Container>
    </div>
  );
};

export default LoginTable;
