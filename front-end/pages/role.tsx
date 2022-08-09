import * as React from "react";
import Button from "@mui/material/Button";
import Usertable from "../components/Usertable";
import { Container } from "@mui/material";
import axios from "axios";
import type { NextPage } from "next";
import RoleTable from "../components/RoleTable";
interface Props {
  roles?: {
    role_name: String;
    role_description: String;
    
  };
}
const category: NextPage<Props> = ({ roles }) => {
  return (
    <Container maxWidth="lg">
      <h1>All role page</h1>
      <RoleTable roles={roles} />
    </Container>
  );
};
export default category;
category.getInitialProps = async (ctx: any) => {
  const res = await axios.get("http://localhost:3001/role");
  const json = await res.data.data;
  // console.log(json);
  return { roles: json };
};
