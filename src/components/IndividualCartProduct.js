import React from "react";
import { Icon } from "react-icons-kit";
import { plus } from "react-icons-kit/feather/plus";
import { minus } from "react-icons-kit/feather/minus";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { db } from "../components/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export const IndividualCartProduct = ({
  data,
  cartProductIncrease,
  cartProductDecrease,
  uid,
}) => {
  const handleCartProductIncrease = () => {
    cartProductIncrease(data);
  };
  const handleCartProductDecrease = () => {
    cartProductDecrease(data);
  };

  const handleDeleteProduct = async () => {
    try {
      // Construct the reference to the document to be deleted
      const productRef = doc(db, uid, data.id);
      // Delete the document
      await deleteDoc(productRef);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={data.img} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Product Name : {data.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Seller : {data.seller}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Price : ${data.price}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          <div className="flex items-center">
            <span className="mr-2">Quantity</span>
            <div className="flex items-center border-2 border-black rounded">
              <div className="cursor-pointer mr-2 ">
                <Icon
                  icon={minus}
                  size={20}
                  onClick={handleCartProductDecrease}
                />
              </div>
              <div>{data.qty}</div>
              <div className="cursor-pointer ml-2">
                <Icon
                  icon={plus}
                  onClick={handleCartProductIncrease}
                  size={20}
                />
              </div>
            </div>
          </div>
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Total Price : ${data.TotalProductPrice}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleDeleteProduct}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
