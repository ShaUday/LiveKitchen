import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function MuiCard({ data, sendParameterToParent }) {
  // separately call the function name if passing data is showing undefined
  const parameterToSend = data.id;
  console.log("New created kitchen id", parameterToSend);

  const handleClick = () => {
    // Call the function passed from the parent component with the parameter
    sendParameterToParent(parameterToSend);
  };

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia sx={{ height: 140 }} image={data.img} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.area}
        </Typography>
      </CardContent>
      <CardActions>
        <NavLink to={`/addSingle/${parameterToSend}`}>
          {/* it will redirect to this route automatically when see dishes is clicked */}
          <NavLink to={`/indi/${parameterToSend}`}>
            <Button
              variant="outlined"
              size="small"
              //use arrow function to pass any data to parent component function
              onClick={handleClick}
            >
              See Dishes
            </Button>
          </NavLink>
        </NavLink>
        <Rating name="read-only" value={data.ratting} readOnly />
      </CardActions>
    </Card>
  );
}
