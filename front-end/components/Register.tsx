import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { FormGroup, Box, TextField, Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [local, setLocal] = useState({});
  const handleSumbit = (e: any) => {
    e.preventDefault();
    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const address = e.target.address.value;
    const phone_number = e.target.phone_number.value;
    const password = e.target.password.value;

    axios
      .post("http://localhost:3001/api/register", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        address: address,
        phone_number: phone_number,
        password: password,
      })
      .then((res) => {
        if (res.data.success === true) {
          console.log(res.statusText);
          console.log(res.data.data);
          console.log(res.data.token);
          setLocal(res.data.token);
          router.push("/user");          
        }
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };
  return (
    <div>
      <Container fixed>
        {/* <pre>{JSON.stringify(temp)}</pre> */}
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
              label="firstname"
              variant="outlined"
              name="firstname"
            />
            <TextField
              id="outlined-basic"
              label="lastname"
              variant="outlined"
              name="lastname"
            />
            <TextField
              id="outlined-basic"
              label="email"
              variant="outlined"
              name="email"
            />
            <TextField
              id="outlined-basic"
              label="address"
              variant="outlined"
              name="address"
            />
            <TextField
              id="outlined-basic"
              label="phone number"
              variant="outlined"
              name="phone_number"
            />
            <TextField
              id="outlined-basic"
              label="password"
              variant="outlined"
              name="password"
            />
            <Button variant="outlined" type="submit">
              Register
            </Button>
            <Button variant="outlined">back to Login</Button>
          </Box>
        </FormGroup>
      </Container>
    </div>
  );
};

export default Register;
