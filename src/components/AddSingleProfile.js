import React, { useEffect, useState } from "react";
import { db, storage } from "../components/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";

function AddSingleProfile() {
  const { parameterFromChild } = useParams();
  const [dish, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [ratting, setRatting] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [data, setData] = useState([]);

  const handleUpload = (e) => {
    // console.log(e.target.files[0]);
    const img = ref(storage, `Imgs/${v4()}`);
    uploadBytes(img, e.target.files[0]).then((data) => {
      console.log(data, "img");
      getDownloadURL(data.ref).then((val) => {
        setImg(val);
      });
    });
  };

  const handleClick = async () => {
    const valRef = collection(db, parameterFromChild);
    await addDoc(valRef, {
      name: dish,
      img: img,
      description: description,
      price: price,
      ratting: ratting,
    });
    alert("Data added successfully");
  };
  //   "id": 1,
  //     "name": "Biscuits",
  //     "img": "./images2/biscuits.jpeg",
  //     "seller": "pran",
  //     "price": "160tk/kg",
  //     "ratting": 4

  const getData = async () => {
    const valRef = collection(db, parameterFromChild);
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
    // console.log(dataDb);
  };

  useEffect(() => {
    getData();
  });
  //   console.log(data, "datadata");

  return (
    <div>
      <input
        onChange={(e) => setDishName(e.target.value)}
        placeholder="Enter Dish name"
      />
      <br />
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter dish description"
      />
      <br />
      <input
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter Price"
      />
      <br />
      <input
        type="number"
        onChange={(e) => setRatting(e.target.value)}
        placeholder="Enter ratting"
      />
      <br />
      <input type="file" onChange={(e) => handleUpload(e)} />
      <br />
      <br />
      <button
        className=" bg-slate-400 text-white border border-2 rounded-lg p-2"
        onClick={handleClick}
      >
        Add
      </button>

      {data.map((value) => (
        <div>
          <h1>Hello</h1>
          <h1>Dish Name : {value.name}</h1>
          <h1> Description : {value.description}</h1>
          <h1>ratting : {value.ratting}</h1>
          <h1>Price : {value.price}</h1>
          <img src={value.img} height="200px" width="200px" alt="img" />
        </div>
      ))}
    </div>
  );
}
export default AddSingleProfile;
