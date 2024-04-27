import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import "./style.css";
const Transition = ({ data }) => {
  console.log(data);
  return (
    <Carousel
      next={() => {
        /* Do stuff */
      }}
      prev={() => {
        /* Do other stuff */
      }}
    >
      {data.map((item) => (
        <Item key={item.name} item={item} />
      ))}
    </Carousel>
  );
};

function Item(props) {
  return (
    <Paper>
      <img className="pic" src={props.item.img} alt="pic" />
      <h2>{props.item.name}</h2>
    </Paper>
  );
}

export default Transition;
