/* eslint-disable no-else-return */
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
import axios from "axios";
import { Form } from "reactstrap";
import BasicLayout from "../components/BasicLayout";

// import bgImage from "assets/images/max-burger-DMRQmC8gRBs-unsplash.jpg";

function signIn() {
  // const [rememberMe, setRememberMe] = useState(false);
  // const handleSetRememberMe = () => setRememberMe(!rememberMe);
  // const { user } = isAuthenticated();

  const [signInData, setSignInData] = useState({
    personalnumber: "",

    errortype: "",
    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });

  function handleChange(evt) {
    const { value } = evt.target;
    setSignInData({ ...signInData, [evt.target.name]: value });
  }

  //* ------------------Pop up models messages--------------------------

  const handleCloseSuccsecModal = () => {
    setSignInData({
      ...signInData,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: true,
    });
  };

  const handleCloseLoadingModal = () => {
    setSignInData({ ...signInData, loading: false });
  };
  const handleCloseErrorModal = () => {
    setSignInData({
      ...signInData,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: false,
    });
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function NavigateUser() {
    if (signInData.NavigateToReferrer) {
      if (isAuthenticated().user.admin === "1" || isAuthenticated().user.admin === "2")
        return <Navigate to="/AdminHome" />;
      return <Navigate to="/userRequestsTable" />;
    }
  }

  const showSuccess = () => (
    <Dialog
      open={signInData.successmsg}
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
          התחברת בהצלחה למערכת
        </MDTypography>
        <MDButton onClick={handleCloseSuccsecModal} variant="gradient" color="light">
          מעבר לאתר
        </MDButton>
      </MDBox>
    </Dialog>
  );
  const showError = () => (
    <Dialog
      open={signInData.error}
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
          שגיאה בהתחברות
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            {signInData.errortype}
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
      open={signInData.loading}
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
            ההץחברות תיקח מספר רגעים...
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

    if (signInData.personalnumber === "" && signInData.personalnumber.length >= 8) {
      flag = false;
      ErrorReason.push("אנא הכנס מספר אישי תקין");
      // toast.error(ErrorReason);
    }
    if (flag !== true) {
      ErrorReason.forEach((reason) => {
        toast.error(reason);
        // setData({ ...data, loading: false, successmsg: false, error: true });
      });

      return false;
    } else {
      return true;
      // setData({ ...data, loading: false, successmsg: true, error: false });
    }
  };

  const SendFormData = async (event) => {
    event.preventDefault();
    setSignInData({ ...signInData, loading: true, successmsg: false, error: false });
    const { personalnumber } = signInData;
    await axios
      .post(`http://localhost:5000/HozlaApi/signin`, { personalnumber })
      .then((res) => {
        // console.log(res.data.user);
        if (res.data.user === "DoNotExist" || res.data.user === undefined) {
          setSignInData({
            ...signInData,
            errortype: "המשתמש אינו קיים, עליך להירשם",
            loading: false,
            successmsg: false,
            error: true,
          });
        } else if (
          res.data.user.approved === false &&
          (res.data.user.admin === "1" || res.data.user.admin === "2")
        ) {
          setSignInData({
            ...signInData,
            errortype: "המשתמש ממתין לאישור מנהל, אנא נסה שוב מאוחר יותר",
            loading: false,
            successmsg: false,
            error: true,
          });
        } else {
          authenticate(res.data);
          setSignInData({
            ...signInData,
            loading: false,
            successmsg: true,
            error: false,
          });
          const count = parseInt(localStorage.getItem("RefreshCount"), 10) + 1;
          updateRefreshCount(count);
        }
      })
      .catch((error) => {
        console.log(error);
        setSignInData({
          ...signInData,
          errortype: "קיימת תקלת שרת אנא נסה שינית מאוחר יותר",
          loading: false,
          successmsg: false,
          error: true,
        });
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (CheckSignUpForm(event)) {
      SendFormData(event);
    }
  };

  //* ------------------Send data to server - end--------------------------
  const signInForm = () => (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="mekatnar"
          borderRadius="lg"
          coloredShadow="mekatnar"
          mx={2}
          mt={-3}
          p={2}
          pb={5}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            {'התחברות למערכת הוצל"א'}
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
                value={signInData.personalnumber}
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="mekatnar" fullWidth>
                התחברות
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                עוד לא נרשמת?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="mekatnar"
                  fontWeight="medium"
                  textGradient
                >
                  לחץ כאן
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );

  return (
    <>
      {/* <DashboardLayout> */}
      {/* <DashboardNavbar /> */}
      {/* <MDBox pt={6} pb={3}> */}
      {/* //! fot the pop up warning windoes */}
      {showError()}
      {showSuccess()}
      {showLoading()}
      {NavigateUser()}

      {signInForm()}
      {/* </MDBox> */}
      {/* <Footer /> */}
      {/* </DashboardLayout> */}
    </>
  );
}

export default signIn;
