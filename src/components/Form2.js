import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Form2() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [err, setErr] = useState("");
  const [isLogin, setLogin] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const toggleLogIn = (e) => {
    setLogin(e.target.checked);
  };
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErr(errorMessage);
        setErr(errorCode);
        // ..
      });
  };

  const auth = getAuth();
  const handleSubmit = (e) => {
    console.log("registration will be added");
    e.preventDefault();
    if (password.length < 6) {
      setErr("password must be at least 6 character long");
    }
    if (!/(?=.*[a-z])/.test(password)) {
      setErr("password must contain one lower case");
      return;
    } else {
      isLogin ? processLogin(email, password) : createNewUser(email, password);
    }
  };
  const processLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setErr("");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        setErr(errorMessage);
      });
  };
  const createNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setErr("");
        verifyEmail();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        setErr(errorMessage);
        // ..
      });
    const verifyEmail = () => {
      sendEmailVerification(auth.currentUser).then(() => {
        // Email verification sent!
        // ...
      });
    };
  };

  return (
    <div>
      {/* <form onSubmit={handleSubmit}> */}
      <Typography gutterBottom variant="h3" align="center">
        Live Kitchen
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              {isLogin ? " Please Log In" : "Please register"}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              Fill up the form and our team will get back to you within 24
              hours.
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Enter first name"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Enter last name"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    placeholder="Enter email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    onBlur={handleEmailChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    placeholder="Enter password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    required
                    onBlur={handlePasswordChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    type="checkbox"
                    name=""
                    id="gridCheck1"
                    onChange={toggleLogIn}
                  />
                  <label htmlFor="gridCheck1">Already Registered?</label>
                </Grid>
                <Grid item xs={12}>
                  <h3>{err}</h3>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleResetPassword}
                  >
                    Reset Password
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {isLogin ? "Login" : "Register"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      {/* </form> */}
    </div>
  );
}

export default Form2;
