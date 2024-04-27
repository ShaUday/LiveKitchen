import React, { useState, useEffect } from "react";
import { db, storage } from "../components/firebase";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function StoreImageTextFirebase() {
  const [kitchen, setKitchenName] = useState("");
  const [description, setDescription] = useState("");
  const [ratting, setRatting] = useState("");
  const [area, setArea] = useState("");
  const [img, setImg] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState([]);

  const handleUpload = async (e) => {
    const imgRef = ref(storage, `Imgs/${uuidv4()}`);
    try {
      await uploadBytes(imgRef, e.target.files[0]);
      const imgUrl = await getDownloadURL(imgRef);
      setImg(imgUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleClick = async () => {
    try {
      const valRef = collection(db, "kitchenData");
      await addDoc(valRef, {
        name: kitchen,
        img: img,
        description: description,
        area: area,
        ratting: ratting,
        id: id,
      });
      alert("Data added successfully");
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const getData = async () => {
    try {
      const valRef = collection(db, "kitchenData");
      const querySnapshot = await getDocs(valRef);
      const allData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(allData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <input
        onChange={(e) => setKitchenName(e.target.value)}
        placeholder="Enter Kitchen name"
      />
      <br />
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter ktichen description"
      />
      <br />
      <input
        onChange={(e) => setArea(e.target.value)}
        placeholder="Enter area"
      />
      <br />
      <input
        type="number"
        onChange={(e) => setRatting(e.target.value)}
        placeholder="Enter ratting"
      />
      <br />
      <input
        type="number"
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter id"
      />
      <br />
      <input type="file" onChange={(e) => handleUpload(e)} />
      <br />
      <br />
      <button onClick={handleClick}>Add</button>

      {data.map((value) => (
        <div key={value.id}>
          <h1>Hello</h1>
          <h1>{value.id}</h1>
          <h1>Kitchen Name : {value.name}</h1>
          <h1> Description : {value.description}</h1>
          <h1>ratting : {value.ratting}</h1>
          <h1>Area : {value.area}</h1>
          <img src={value.img} height="200px" width="200px" alt="img" />
        </div>
      ))}
    </div>
  );
}

export default StoreImageTextFirebase;
