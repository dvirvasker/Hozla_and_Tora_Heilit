/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-brace-presence */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link, Navigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

import { Icons, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Dialog
import { Dialog, DialogContent, DialogContentText, DialogTitle, Modal } from "@mui/material";

import { authenticate, isAuthenticated, signin, signout, updateRefreshCount } from "auth/index";

// Images
import bgImage from "assets/images/book-bg-image.jpg";
import { inesilizeRefreshCount } from "auth/index";
import axios from "axios";
import { Form } from "reactstrap";

// import bgImage from "assets/images/max-burger-DMRQmC8gRBs-unsplash.jpg";

// ? Hozla user ==> 0
// ? ToraHailit user ==> 3
function SignUpAdmin() {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    personalnumber: "",

    errortype: "",
    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });

  function handleChange(evt) {
    const { value } = evt.target;
    setSignUpData({ ...signUpData, [evt.target.name]: value });
  }

  //* ------------------Pop up models messages--------------------------

  const handleCloseSuccsecModal = () => {
    setSignUpData({
      ...signUpData,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: true,
    });
  };

  const handleCloseLoadingModal = () => {
    setSignUpData({ ...signUpData, loading: false });
  };
  const handleCloseErrorModal = () => {
    setSignUpData({
      ...signUpData,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: false,
    });
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function NavigateUser() {
    if (signUpData.NavigateToReferrer) {
      return <Navigate to="/authentication/SG96bGFTeXN0ZW0/sign-in" />;
    }
  }

  const showSuccess = () => (
    <Dialog
      open={signUpData.successmsg}
      onClose={handleCloseSuccsecModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        coloredShadow="mekatnar"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          נרשמת בהצלחה למערכת, שים לב כי תוכל להתחבר רק לאחר אישור מנהל המערכת
        </MDTypography>
        <MDButton onClick={handleCloseSuccsecModal} variant="gradient" color="light">
          סגירה
        </MDButton>
      </MDBox>
    </Dialog>
  );
  const showError = () => (
    <Dialog
      open={signUpData.error}
      onClose={handleCloseErrorModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="error"
        coloredShadow="error"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          שגיאה בהרשמה
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            וודא שהינך כבר רשום למערכת, במידה ולא נסה שנית מאוחר יותר
          </MDTypography>
          <MDButton onClick={handleCloseErrorModal} variant="gradient" color="light">
            סגירה
          </MDButton>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const showLoading = () => (
    <Dialog
      open={signUpData.loading}
      onClose={handleCloseLoadingModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        coloredShadow="mekatnar"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        px={5}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          בטעינה
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            ההרשמה תיקח מספר רגעים...
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  //* ------------------Pop up models messages - end--------------------------

  //* ------------------Send data to server--------------------------
  // eslint-disable-next-line consistent-return
  const CheckSignUpForm = (event) => {
    event.preventDefault();
    let flag = true;
    const ErrorReason = [];

    if (signUpData.personalnumber === "") {
      flag = false;
      ErrorReason.push("אנא הכנס מספר אישי");
      // toast.error(ErrorReason);
    }
    if (!(signUpData.personalnumber.length === 7 || signUpData.personalnumber.length === 9)) {
      flag = false;
      ErrorReason.push("אנא וודא כי המספר האישי תקין");
      // toast.error(ErrorReason);
    }
    if (signUpData.firstName === "") {
      flag = false;
      ErrorReason.push("אנא הכנס שם פרטי");
      // toast.error(ErrorReason);
    }
    if (signUpData.lastName === "") {
      flag = false;
      ErrorReason.push("אנא הכנס שם משפחה");
      // toast.error(ErrorReason);
    }
    if (flag !== true) {
      ErrorReason.forEach((reason) => {
        toast.error(reason);

        // setData({ ...data, loading: false, successmsg: false, error: true });
      });
      return false;
    }
    return true;
    // setData({ ...data, loading: false, successmsg: true, error: false });
  };

  const SendFormData = async (event) => {
    event.preventDefault();
    setSignUpData({ ...signUpData, loading: true, successmsg: false, error: false });
    const newUser = {
      firstName: signUpData.firstName,
      lastLame: signUpData.lastName,
      personalnumber: signUpData.personalnumber,
      admin: "1",
      approved: false,
    };
    await axios
      .post(`http://localhost:5000/HozlaApi/signup`, newUser)
      .then((res) => {
        // console.log(`gotten new user from sign up`);
        // console.log(`${res.data}`);
        // console.log({ personalnumber: res.data.user.personalnumber });
        // console.log(res.data.user.personalnumber);
        // authenticate(res.data);
        if (res.data.user === "Exist") {
          setSignUpData({
            ...signUpData,
            loading: false,
            error: true,
            errortype: "משתמש כבר קיים במערכת",
          });
        } else {
          // inesilizeRefreshCount();
          setSignUpData({ ...signUpData, loading: false, error: false, successmsg: true });
          // const count = parseInt(localStorage.getItem("RefreshCount"), 10) + 1;
          // updateRefreshCount(count);
        }
      })
      .catch((error) => {
        // console.log(error);
        setSignUpData({ ...signUpData, loading: false, error: true, successmsg: false });
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (CheckSignUpForm(event)) {
      SendFormData(event);
    }
  };

  //* ------------------Send data to server - end--------------------------
  const singUpUser = () => (
    <Card>
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        borderRadius="lg"
        coloredShadow="success"
        mx={2}
        mt={-3}
        p={3}
        mb={1}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          {`הנהלה - מערכת הוצל"א / תורה חילית`}
        </MDTypography>
        <MDTypography display="block" variant="button" color="white" my={1}>
          הגיע הזמן להירשם אלינו 😉
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form" onSubmit={onSubmit}>
          <MDBox mb={2}>
            <MDInput
              required
              type="text"
              name="personalnumber"
              onChange={handleChange}
              variant="standard"
              label="מספר אישי"
              value={signUpData.personalnumber}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              required
              type="text"
              name="firstName"
              label="שם פרטי"
              variant="standard"
              value={signUpData.firstName}
              onChange={handleChange}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              required
              type="text"
              name="lastName"
              label="שם משפחה"
              variant="standard"
              value={signUpData.lastName}
              onChange={handleChange}
              fullWidth
            />
          </MDBox>
          {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="mekatnar"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox> */}
          <MDBox mt={4} mb={1}>
            <MDButton variant="gradient" color="mekatnar" type="submit" fullWidth>
              הירשם
            </MDButton>
          </MDBox>
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              <MDTypography
                component={Link}
                to="/authentication/sign-in"
                variant="button"
                color="mekatnar"
                fontWeight="medium"
                textGradient
              >
                להתחברות לחץ כאן
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );

  return (
    <CoverLayout image={bgImage}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {showError()}
      {showSuccess()}
      {showLoading()}
      {NavigateUser()}

      {singUpUser()}
    </CoverLayout>
  );
}
export default SignUpAdmin;
