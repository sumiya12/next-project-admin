import axios from "axios";
import Router, { useRouter } from "next/router";
import category from "../../category";

const router = useRouter();
export default function cat({ category }) {
  console.log(category);
  function addCategory(e: any) {}
  const handleSubmit = () => {
    router.push("/category");
  };

  return (
    <>
      <h1 style={{ color: "black" }}>One category</h1>cat
      <Box
        component="form"
        onSubmit={(any) => addCategory(e)}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="Name"
          variant="standard"
          value={category[0].name}
        />
        <TextField
          id="standard-basic"
          label="Color"
          variant="standard"
          value={category[0].color}
        />
        <Button type="submit">Add category</Button>
      </Box>
    </>
  );
}

export async function getStaticPaths() {
  const res = await axios.get("http://localhost:3000/category");
  return {
    fallback: false,
    paths: res.data.data.map((category) => ({
      params: {
        id: category.id.toString(),
      },
    })),
  };
}

export async function getStaticProps({ params }) {
  const res = await axios.get(`http://localhost:3000/category/${params}`);
  return {
    props: {
      category: res.data.data,
    },
  };
}
