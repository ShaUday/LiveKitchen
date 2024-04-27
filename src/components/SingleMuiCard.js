import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";

export default function SingleMuiCard({ data, onAddToCart }) {
  const Swal = require("sweetalert2");
  const handleAddToCart = () => {
    onAddToCart(data);
    Swal.fire({
      title: "Success",
      text: "Added To Cart",
      icon: "success",
      confirmButtonText: "Okay",
    });
  };
  return (
    <div>
      <div></div>
      <div className=" mt-1">
        <Card sx={{ maxWidth: 500 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={data.img}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Product Name : {data.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description : {data.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price : {data.price}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              size="small"
              //use arrow function to pass any data to parent component function
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>

            <Rating name="read-only" value={data.ratting} readOnly />
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
