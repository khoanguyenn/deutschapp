import React from "react";
import { Button, TextField, Fab } from "@material-ui/core";
import { Facebook, Mail } from "@material-ui/icons";
import styles from "../styles/Login.css.js";

class Login extends React.Component {
  render() {
    return (
      <div style={styles.app}>
        <div style={styles.container}>
          <div style={styles.panelLeft}>
            <h1 style={styles.title}>Hallo, Leute</h1>
            <p>Wir sind REC !</p>
          </div>
          <div style={styles.panelRight}>
            <h1 style={{ fontSize: "40px" }}>Sign in</h1>
            <div>
              <Fab style={styles.signinFacebook} color="primary">
                <Facebook />
              </Fab>
              <Fab style={styles.signinMail} color="primary">
                <Mail />
              </Fab>
            </div>
            <p style={styles.p}>or use your account</p>
            <TextField
              style={styles.loginField}
              variant="outlined"
              color="primary"
              label="Email"
            />
            <TextField
              style={styles.loginField}
              variant="outlined"
              color="primary"
              label="Password"
            />
            <p style={styles.p}>Forgot your password ?</p>
            <Button style={styles.loginBtn} variant="contained" color="primary">
              Sign in
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
