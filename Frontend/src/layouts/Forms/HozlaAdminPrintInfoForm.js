/* eslint-disable spaced-comment */
/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-use-before-define */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable consistent-return */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */

import Icon from "@mui/material/Icon";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Popup from "reactjs-popup";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ManagementHoztla from "layouts/tables/adminManagementTable";

import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate, Routes, Route } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Grid from "@mui/material/Grid";

import {
  Button,
  Card,
  CardHeader,
  Container,
  CardBody,
  FormGroup,
  Form,
  FormText,
  InputGroupAddon,
  Input,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Label,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Material Dashboard 2 React Components
import MDAlert from "components/MDAlert";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  TextField,
} from "@mui/material";
import Select from "react-select";
import { CompressOutlined } from "@mui/icons-material";

import { signin, authenticate, isAuthenticated } from "auth/index";

const { user } = isAuthenticated();

export default function HozlaPrintRequestForm() {
  // const currentDate = new Date();
  // console.log(currentDate);
  // let dateString = "";
  // if (currentDate.getMonth() + 1 >= 10) {
  //   if (currentDate.getDate() >= 10) {
  //     dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1
  //       }-${currentDate.getDate()}`;
  //   } else {
  //     dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1
  //       }-0${currentDate.getDate()}`;
  //   }
  // } else {
  //   if (currentDate.getDate() >= 10) {
  //     dateString = `${currentDate.getFullYear()}-0${currentDate.getMonth() + 1
  //       }-${currentDate.getDate()}`;
  //   } else {
  //     dateString = `${currentDate.getFullYear()}-0${currentDate.getMonth() + 1
  //       }-0${currentDate.getDate()}`;
  //   }
  // }

  const params = useParams();

  const [data, setData] = useState({
    hozlaRequestID: params.formID,
    workName: "",
    anaf: "",

    numColourfulBeats: 0,
    numNoColourfulBeats: 0,
    sumColourfulPages: 0,
    sumNoColourfulPages: 0,
    numPages: 1,
    twoSides: false,

    printColor: "color",
    selected: "A4",
    selectedBW: "none",

    // A0BW: false,
    // A3BW: false,
    // A4BW: false,
    // A5BW: false,
    // A6BW: false,
    // BWA4: false,
    // BWA3: false,

    // A0: false,
    // A3: false,
    // A4: true,
    // A5: false,
    // A6: false,
    // A4b: false,
    // A3b: false,

    errortype: "",
    error: false,
    successmsg: false,
    loading: false,
    redirectToReferrer: false,
  });
  const [adminData, setAdminData] = useState({
    countPrintInYear: 0,
    numBeatsColourful: 0,
    sumBeatsBlackwhite: 0,
    sumRequestInYear: 0,
  });
  const [text, setText] = useState();
  // const [value, setValue] = React.useState('');

  const textPlaceHolderInputs = [
    "סה''כ דפים צבעוני",
    "סה''כ דפים שחור לבן",
    "מס' דפים",
    "מס' פעימות צבעוני",
    "מס' פעימות שחור לבן",
    "צילום בצבע",
    "צילום בשחור לבן",
    "סוג הדפסה",
    "דו צדדי",
    "סוג דף",
    "שיטת  צילום",
    "סה''כ דפים",
    "מס' פעימות",
  ];
  const [selectedBWOptions, setSelectedBWOptions] = useState();
  const [selectedOptions, setSelectedOptions] = useState();
  const [propPrint, setPropPrint] = useState([
    {
      propCopyType: "b&w2",
      propPageType: "A4",
      numBeats: 1,
      numPages: 1,
    },
  ]);

  // Array of all options
  const optionBWList = [
    { value: "A0BW", label: "A0" },
    { value: "A3BW", label: "A3" },
    { value: "A4BW", label: "A4" },
    { value: "A5BW", label: "A5" },
    { value: "A6BW", label: "A6" },
    { value: "BWA4", label: "A4 בריסטול" },
    { value: "BWA3", label: "A3 בריסטול" },
  ];
  const optionList = [
    { value: "A0BW", label: "A0" },
    { value: "A3BW", label: "A3" },
    { value: "A4BW", label: "A4" },
    { value: "A5BW", label: "A5" },
    { value: "A6BW", label: "A6" },
    { value: "BWA4", label: "A4 בריסטול" },
    { value: "BWA3", label: "A3 בריסטול" },
  ];

  // Function triggered on selection
  function handleBWSelect(dataOption) {
    setSelectedBWOptions(dataOption);
    // console.log(selectedBWOptions);
  }
  function handleSelect(dataOption) {
    setSelectedOptions(dataOption);
    // console.log(selectedOptions);
  }

  //takes the data drom the DB and gives inital values to the useState data, each time the page gets rendred/refreshed
  useEffect(() => {
    axios
      // ! .get(`http://localhost:5000/hozlaAdminRequests/${params.formID}`)
      .get(`http://localhost:5000/hozlaRequests/${params.formID}`)
      .then((response) => {
        // console.log(`the object data`);
        console.log(response.data);
        console.log(params.formID);
        // console.log(params.workName);
        axios
          .get(`http://localhost:5000/hozlaAdminRequests/${params.formID}`)
          .then((response1) => {
            // console.log(`the object data`);

            if (response1.data !== null) {
              setText("הטופס עודכן");
              // console.log(twoSides);
            } else {
              setText();
            }
          })
          .catch((error) => {
            console.log(error);
            console.log(error.code);
          });
        setData(response.data);
        setData({
          ...data,
          workName: response.data.workName,
          anaf: response.data.anaf,
          errortype: "",
          error: false,
          successmsg: false,
          loading: false,
          redirectToReferrer: false,
        });
        // setdates({
        //   workGivenDate: response.data.workGivenDate.split("T")[0],
        //   workRecivedDate: response.data.workRecivedDate.split("T")[0],
        // });
      })
      .catch((error) => {
        console.log(error);
        console.log(error.code);
        // if (error.code === "ERR_BAD_REQUEST") {
        //   setError404(true);
        // } else {
        //   setErrorDB(true);
        // }
      });

    // axios
    //   .get(`http://localhost:5000/AnnualInfoAdmin/`)
    //   .then((response) => {
    //     if (response.data === null) {
    //       axios.post(`http://localhost:5000/AnnualInfoAdmin/add`, adminData).then((res) => {
    //         setAdminData({
    //           ...adminData,
    //           countPrintInYear: response.data.countPrintInYear,
    //           numBeatsColourful: response.data.numBeatsColourful,
    //           sumBeatsBlackwhite: response.data.sumBeatsBlackwhite,
    //           sumRequestInYear: response.data.sumRequestInYear,
    //         });
    //         // toast.success(`הטופס נשלח בהצלחה`);
    //         // history.push(`/signin`);
    //         console.log(res.data);
    //       });
    //     } else {
    //       console.log(response.data);

    //       setAdminData(response.data);
    //       setAdminData({
    //         ...adminData,
    //         countPrintInYear: response.data.countPrintInYear,
    //         numBeatsColourful: response.data.numBeatsColourful,
    //         sumBeatsBlackwhite: response.data.sumBeatsBlackwhite,
    //         sumRequestInYear: response.data.sumRequestInYear,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     console.log(error.code);
    //     // if (error.code === "ERR_BAD_REQUEST") {
    //     //   setError404(true);
    //     // } else {
    //     //   setErrorDB(true);
    //     // }
    //   });
  }, []);

  function handleChange(evt) {
    const { value } = evt.target;
    setData({ ...data, [evt.target.name]: value });
  }
  function handleChangeCheckbox(evt) {
    // setData({ ...data, [evt.target.name]: evt.target.twoSides });
    // setData({ ...data, twoSides: !data.twoSides });
    if (data.twoSides === true) {
      setData({
        ...data,
        twoSides: false,
        sumColourfulPages: Math.round(data.sumColourfulPages * 2),
        numColourfulBeats: Math.round(data.numColourfulBeats * 2),
        sumNoColourfulPages: Math.round(data.sumNoColourfulPages * 2),
        numNoColourfulBeats: Math.round(data.numNoColourfulBeats * 2),
      });
    } else {
      setData({
        ...data,
        twoSides: true,
        sumColourfulPages: Math.round(data.sumColourfulPages / 2),
        numColourfulBeats: Math.round(data.numColourfulBeats / 2),
        sumNoColourfulPages: Math.round(data.sumNoColourfulPages / 2),
        numNoColourfulBeats: Math.round(data.numNoColourfulBeats / 2),
      });
    }
  }
  // function ChangeCheckboxTypePage(evt) {
  //   const { name } = evt.target;
  //   const nameData = JSON.parse("data." + name);
  //   console.log(nameData);
  //   if (nameData === true) {
  //     setData({ ...data, [evt.target]: false });
  //   } else if (nameData === false) {
  //     setData({ ...data, [evt.target]: true });
  //   }
  //   //
  //   console.log(data);
  //   //
  // }

  function handleChangeColourfulBeat(evt) {
    const { value } = evt.target;
    setData({ ...data, [evt.target.name]: value, sumColourfulPages: Math.round(value / 2) });
    // setData({ numPages: data.sumColourfulPages + data.sumNoColourfulPages });
  }
  function handleNoChangeColourfulBeat(evt) {
    const { value } = evt.target;
    setData({ ...data, [evt.target.name]: value, sumNoColourfulPages: Math.round(value / 2) });
  }

  function handleChangeColourfulPage(evt) {
    const { value } = evt.target;
    setData({ ...data, numColourfulBeats: Math.round(value * 2), [evt.target.name]: value });
  }
  function handleNoChangeColourfulPage(evt) {
    const { value } = evt.target;
    setData({ ...data, numNoColourfulBeats: Math.round(value * 2), [evt.target.name]: value });
  }
  const handleChangeNumPrint = (index) => (evt) => {
    const newPropPrint = [...propPrint];
    newPropPrint[index].propPageType = evt.target.value;

    setPropPrint(newPropPrint);
    console.log(newPropPrint);
  };
  const handleChangeCopyPrint = (index) => (evt) => {
    const newPropPrint = [...propPrint];
    newPropPrint[index].propCopyType = evt.target.value;

    setPropPrint(newPropPrint);
    console.log(newPropPrint);
  };
  const handleChangeNumBeats = (index) => (evt) => {
    const newPropPrint = [...propPrint];
    newPropPrint[index].numBeats = evt.target.value;

    setPropPrint(newPropPrint);
    console.log(newPropPrint);
  };
  const handleChangeNumPages = (index) => (evt) => {
    const newPropPrint = [...propPrint];
    newPropPrint[index].numPages = evt.target.value;

    setPropPrint(newPropPrint);
    console.log(newPropPrint);
  };
  const addFields = () => {
    const newfield = {
      propCopyType: "b&w2",
      propPageType: "A4",
      numBeats: 1,
      numPages: 1,
    };
    setPropPrint([...propPrint, newfield]);
    console.log(propPrint);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // sumNumBeatsAndPages();
    if (CheckSignUpForm(event)) {
      SendFormData(event);
    }
  };
  // const sumNumBeatsAndPages = () => {
  //   let numPages = 0;
  //   let numNoColourfulBeats = 0;
  //   let sumNoColourfulPages = 0;
  //   let numColourfulBeats = 0;
  //   let sumColourfulPages = 0;

  //   propPrint.forEach((propData, index) => {
  //     if (propData.propCopyType === "b&w2" || propData.propCopyType === "b&w1") {
  //       numNoColourfulBeats = Math.round(numNoColourfulBeats) + Math.round(propData.numBeats);
  //       sumNoColourfulPages = Math.round(sumNoColourfulPages) + Math.round(propData.numPages);
  //       // setData({
  //       //   ...data,
  //       //   numNoColourfulBeats: data.numNoColourfulBeats + Math.round(propData.numBeats),
  //       // });
  //       // setData({
  //       //   ...data,
  //       //   sumNoColourfulPages: data.sumNoColourfulPages + Math.round(propData.numPages),
  //       // });
  //     }
  //     if (propData.propCopyType === "color1" || propData.propCopyType === "color2") {
  //       numColourfulBeats = Math.round(numColourfulBeats) + Math.round(propData.numBeats);
  //       sumColourfulPages = Math.round(sumColourfulPages) + Math.round(propData.numPages);
  //       // setData({
  //       //   ...data,
  //       //   numColourfulBeats: data.numColourfulBeats + Math.round(propData.numBeats),
  //       // });
  //       // setData({
  //       //   ...data,
  //       //   sumColourfulPages: data.sumColourfulPages + Math.round(propData.numPages),
  //       // });
  //     }
  //     numPages = Math.round(numPages) + Math.round(propData.numPages);
  //     // setData({
  //     //   ...data,
  //     //   numColourfulBeats: Math.round([data.numColourfulBeats]) + Math.round(propData.numPages),
  //     // });
  //     console.log(propData);
  //   });
  //   setData({ ...data, numPages: Math.round(numPages) });
  //   console.log(numPages);
  //   console.log(numNoColourfulBeats);
  //   console.log(sumNoColourfulPages);
  //   console.log(numColourfulBeats);
  //   console.log(sumColourfulPages);
  //   console.log(data);
  // };

  const CheckSignUpForm = (event) => {
    event.preventDefault();
    let flag = true;
    const ErrorReason = [];

    // if (data.unit === "") {
    //   flag = false;
    //   ErrorReason.push("יחידה לא צויין");
    //   // toast.error(ErrorReason);
    // }
    // if (data.sumColourfulPages === 0 && data.sumNoColourfulPages === 0) {
    //   if (data.sumColourfulPages === 0) {
    //     flag = false;
    //     ErrorReason.push("כמות הדפים צבעוניים לא צויינה");
    //     //toast.error(ErrorReason);
    //   }
    //   if (data.sumNoColourfulPages === 0) {
    //     flag = false;
    //     ErrorReason.push("כמות דפיי שחור לבן לא צויינה ");
    //     //toast.error(ErrorReason);
    //   }
    // }
    // if (data.numPages === 0) {
    //   flag = false;
    //   ErrorReason.push("כמות הדפים לא צויינה ");
    //   //toast.error(ErrorReason);
    // }
    // if ((data.numColourfulBeats === 0 && data.numNoColourfulBeats === 0) === undefined) {
    //   if (data.numColourfulBeats === 0) {
    //     flag = false;
    //     ErrorReason.push("כמות הפעימות צבעוני לא צויינה ");
    //     //toast.error(ErrorReason);
    //   }
    //   if (data.numNoColourfulBeats === 0) {
    //     flag = false;
    //     ErrorReason.push("כמות הפעימות שחור לבן לא צויינה ");
    //     //toast.error(ErrorReason);
    //   }
    //   console.log("undefined");
    // }
    if (propPrint.length <= 0) {
      flag = false;
      ErrorReason.push("חסרים פרטי הדפסה");
    }
    // if (data.selected === "none" && data.selectedBW === "none") {
    //   flag = false;
    //   ErrorReason.push("סוג צילום לא צויין");
    //   //toast.error(ErrorReason);
    // }
    // if (selectedBWOptions === undefined && selectedOptions === undefined) {
    //   flag = false;
    //   ErrorReason.push("סוג צילום לא צויין");
    //   //toast.error(ErrorReason);
    // }

    // if (flag != true) {
    //     toast.error(ErrorReason);
    // }

    if (flag !== true) {
      ErrorReason.forEach((reason) => {
        toast.error(reason);
        return false;
        // setData({ ...data, loading: false, successmsg: false, error: true });
      });
    } else {
      return true;
      // setData({ ...data, loading: false, successmsg: true, error: false });
    }
  };

  const SendFormData = (event) => {
    event.preventDefault();
    setData({ ...data, loading: true, successmsg: false, error: false, NavigateToReferrer: false });
    // setAdminData({ ...adminData, numPages: Math.floor(adminData.numPages) + data.numPages });
    const requestData = {
      // sumColourfulPages: Math.floor(data.sumColourfulPages),
      // sumNoColourfulPages: Math.floor(data.sumNoColourfulPages),
      // numPages: data.numPages,
      // numColourfulBeats: Math.floor(data.numColourfulBeats),
      // numNoColourfulBeats: Math.floor(data.numNoColourfulBeats),
      // selected: JSON.stringify(selectedOptions),
      // selectedBW: JSON.stringify(selectedBWOptions),
      propPrints: propPrint,
      twoSides: data.twoSides,
      hozlaRequestID: params.formID,
      workName: data.workName,
      anaf: data.anaf,

      // errortype: data.errortype,
      // error: data.error,
      // successmsg: data.successmsg,
      // loading: data.loading,
      // redirectToReferrer: data.redirectToReferrer,
      // value: value,
    };
    console.log(requestData);

    const adminRequestData = {
      countPrintInYear: adminData.countPrintInYear + Math.floor(data.numPages),
      numBeatsColourful: adminData.numBeatsColourful + Math.floor(data.numColourfulBeats),
      sumBeatsBlackwhite: adminData.sumBeatsBlackwhite + Math.floor(data.numNoColourfulBeats),
      sumRequestInYear: adminData.sumRequestInYear + 1,
      // numPages: adminData.numPages + Math.floor(data.numPages),
    };
    console.log(adminRequestData);
    if (text === "הטופס עודכן") {
      axios
        .post(`http://localhost:5000/hozlaAdminRequests/update/${params.formID}`, requestData)
        .then((res1) => {
          // console.log(`the object data`);
          setData({
            ...data,
            work_id: res1.data,
            loading: false,
            error: false,
            successmsg: true,
            NavigateToReferrer: false,
          });
        })
        .catch((error) => {
          console.log(error);
          console.log(error.code);
        });
    } else {
      axios
        .post(`http://localhost:5000/hozlaAdminRequests/add`, requestData)
        .then((res) => {
          setData({
            ...data,
            work_id: res.data,
            loading: false,
            error: false,
            successmsg: true,
            NavigateToReferrer: false,
          });
          // toast.success(`הטופס נשלח בהצלחה`);
          // history.push(`/signin`);
          console.log(res.data);
        })
        .catch((error) => {
          // console.log(error);
          setData({
            ...data,
            errortype: error.response,
            loading: false,
            error: true,
            NavigateToReferrer: false,
          });
        });
    }

    // axios
    //   .post(`http://localhost:5000/AnnualInfoAdmin/update`, adminRequestData)
    //   .then((res) => {
    //     setData({
    //       ...data,
    //       work_id: res.data,
    //       loading: false,
    //       error: false,
    //       successmsg: true,
    //       NavigateToReferrer: false,
    //     });
    //     // toast.success(`הטופס נשלח בהצלחה`);
    //     // history.push(`/signin`);
    //     console.log(res.data);
    //   })
    //   .catch((error) => {
    //     // console.log(error);
    //     setData({
    //       ...data,
    //       errortype: error.response,
    //       loading: false,
    //       error: true,
    //       NavigateToReferrer: false,
    //     });
    //   });
  };
  const handleCloseSuccsecModal = () => {
    setData({ ...data, loading: false, error: false, successmsg: false, NavigateToReferrer: true });
  };
  const handleCloseLoadingModal = () => {
    setData({ ...data, loading: false });
  };
  const handleCloseErrorModal = () => {
    setData({
      ...data,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: false,
    });
  };
  const NavigateUser = () => {
    if (data.NavigateToReferrer) {
      return <Navigate to="/managementHoztla" />;
    }
  };

  const showSuccess = () => (
    <Dialog
      open={data.successmsg}
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
          הטופס עודכן
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            מספר אסמכתא:{/* {params.formID} */} {parseInt(params.formID.slice(-4), 36)}
          </MDTypography>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            <Link style={{ color: "white" }} to="/managementHoztla">
              לניהול הבקשות
            </Link>
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  const showError = () => (
    <Dialog
      open={data.error}
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
          שגיאה בשליחת העדכון
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            אנא נסה שנית מאוחר יותר
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const showLoading = () => (
    <Dialog
      open={data.loading}
      onClose={handleCloseLoadingModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        coloredShadow="mekatnar"
        borderRadius="l"
        p={3}
        px={5}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          בטעינה
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            שליחת הטופס תיקח מספר רגעים...
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  const hozlaAdminPrintInfoForm = () => (
    <Container className="" dir="rtl">
      <Row className="justify-content-center">
        <Col lg="6" md="7">
          <Card className="shadow border-0">
            <CardBody className="px-lg-8 py-lg-10">
              <MDBox
                variant="gradient"
                bgColor="mekatnar"
                borderRadius="lg"
                coloredShadow="mekatnar"
                mx={2}
                mt={-3}
                p={3}
                mb={1}
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  טופס מספר
                </MDTypography>
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  {/* {params.formID} */} {parseInt(params.formID.slice(-4), 36)}
                </MDTypography>
              </MDBox>
              <MDBox textAlign="center">
                <FormGroup>
                  <MDTypography variant="h4" fontWeight="medium" color="success" mt={1}>
                    {text}
                  </MDTypography>
                </FormGroup>
              </MDBox>
              <MDTypography variant="h4" fontWeight="medium" color="black" mt={1}>
                שם העבודה:
              </MDTypography>
              <Label>{data.workName}</Label>

              <Form style={{ textAlign: "right" }} role="form" onSubmit={onSubmit}>
                <FormGroup row className="">
                  {/* <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          // defaultChecked
                          // checked={data.twoSides}
                          value={data.twoSides}
                          onChange={handleChangeCheckbox}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label={<MDTypography for="twoSides">{textPlaceHolderInputs[8]}</MDTypography>}
                      labelPlacement="start"
                    />
                  </FormGroup> */}
                  {/* <FormGroup>
                    <Label for="numColourfulBeats">{textPlaceHolderInputs[3]}</Label>
                    <Input
                      name="numColourfulBeats"
                      type="number"
                      min="0"
                      value={data.numColourfulBeats}
                      onChange={handleChangeColourfulBeat}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="numNoColourfulBeats">{textPlaceHolderInputs[4]}</Label>
                    <Input
                      name="numNoColourfulBeats"
                      type="number"
                      min="0"
                      value={data.numNoColourfulBeats}
                      onChange={handleNoChangeColourfulBeat}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="sumColourfulPages">{textPlaceHolderInputs[0]}</Label>
                    <Input
                      name="sumColourfulPages"
                      type="number"
                      min="0"
                      value={data.sumColourfulPages}
                      onChange={handleChangeColourfulPage}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="sumNoColourfulPages">{textPlaceHolderInputs[1]}</Label>
                    <Input
                      name="sumNoColourfulPages"
                      type="number"
                      min="0"
                      value={data.sumNoColourfulPages}
                      onChange={handleNoChangeColourfulPage}
                    />
                  </FormGroup> */}
                  {/* <FormGroup>
                    <Label for="numPages">{textPlaceHolderInputs[11]}</Label>
                    <Input
                      name="numPages"
                      type="number"
                      min="1"
                      value={data.numPages}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup> */}
                  <FormGroup>
                    {propPrint.map((propPrints, index) => (
                      <FormGroup>
                        <MDBox
                          bgColor="light"
                          borderRadius="lg"
                          opacity={5}
                          shadow="lg"
                          variant="contained"
                          p={1}
                        >
                          <Grid container spacing={1}>
                            <MDButton
                              color="mekatnar"
                              iconOnly
                              variant="text"
                              onClick={() => {
                                if (index > -1) {
                                  setPropPrint((currentProp) =>
                                    propPrint.filter((oneProp, onePIndex) => onePIndex !== index)
                                  );
                                }
                              }}
                            >
                              <Icon fontSize="small">clear</Icon>&nbsp;
                            </MDButton>
                            {/* <Grid item xs={0.5}></Grid> */}
                            <Grid item xs={4}>
                              <Label for="copyType">{textPlaceHolderInputs[10]}</Label>
                              <Input
                                // placeholder={textPlaceHolderInputs[7]}
                                name="copyType"
                                type="select"
                                value={propPrint[index].propCopyType}
                                onChange={handleChangeCopyPrint(index)}
                              >
                                <option defult value="b&w2">
                                  שחור לבן דו צדדי
                                </option>
                                <option value="color1">צבעוני יחיד</option>
                                <option value="color2">צבעוני דו צדדי</option>
                                <option value="b&w1">שחור לבן יחיד</option>
                              </Input>
                            </Grid>
                            <Grid item xs={3}>
                              <Label for="pageType">{textPlaceHolderInputs[9]}</Label>
                              <Input
                                name="pageType"
                                type="select"
                                value={propPrint[index].propPageType}
                                onChange={handleChangeNumPrint(index)}
                              >
                                <option value="A0">A0</option>
                                <option value="A3">A3</option>
                                <option defult value="A4">
                                  A4
                                </option>
                                <option value="A5">A5</option>
                                <option value="A6">A6</option>
                                <option value="A4b">A4 בריסטול</option>
                                <option value="A3b">A3 בריסטול</option>
                              </Input>
                            </Grid>
                            <Grid item xs={2}>
                              <Label for="numBeats">{textPlaceHolderInputs[12]}</Label>
                              <Input
                                name="numBeats"
                                type="number"
                                min="1"
                                value={propPrint[index].numBeats}
                                onChange={handleChangeNumBeats(index)}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <Label for="numPages">{textPlaceHolderInputs[2]}</Label>
                              <Input
                                name="numPages"
                                type="number"
                                min="1"
                                value={propPrint[index].numPages}
                                onChange={handleChangeNumPages(index)}
                                required
                              />
                            </Grid>
                          </Grid>
                        </MDBox>
                      </FormGroup>
                    ))}

                    <MDButton variant="text" color="mekatnar" iconOnly onClick={addFields}>
                      <Icon>add</Icon>
                    </MDButton>
                  </FormGroup>
                  {/* <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          // defaultChecked
                          // checked={data.twoSides}
                          name="A0BW"
                          value={data.A0BW}
                          onChange={ChangeCheckboxTypePage}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label={<MDTypography for="A0BW">A0BW</MDTypography>}
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="A3BW"
                          // defaultChecked
                          // checked={data.twoSides}
                          value={data.A3BW}
                          onChange={ChangeCheckboxTypePage}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label={<MDTypography for="A3BW">A3BW</MDTypography>}
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="A4BW"
                          // defaultChecked
                          // checked={data.twoSides}
                          value={data.A4BW}
                          onChange={ChangeCheckboxTypePage}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label={<MDTypography for="A4BW">A4BW</MDTypography>}
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="A5BW"
                          // defaultChecked
                          // checked={data.twoSides}
                          value={data.A5BW}
                          onChange={ChangeCheckboxTypePage}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label={<MDTypography for="A5BW">A5BW</MDTypography>}
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="A6BW"
                          // defaultChecked
                          // checked={data.twoSides}
                          value={data.A6BW}
                          onChange={ChangeCheckboxTypePage}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label={<MDTypography for="A6BW">A6BW</MDTypography>}
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="BWA4"
                          // defaultChecked
                          // checked={data.twoSides}
                          value={data.BWA4}
                          onChange={ChangeCheckboxTypePage}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label={<MDTypography for="BWA4">BWA4</MDTypography>}
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="BWA3"
                          // defaultChecked
                          // checked={data.twoSides}
                          value={data.BWA3}
                          onChange={ChangeCheckboxTypePage}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label={<MDTypography for="BWA3">BWA3</MDTypography>}
                      labelPlacement="start"
                    />
                  </FormGroup> */}
                  {/* <FormGroup>
                    <Label for="printColor">{textPlaceHolderInputs[7]}</Label>
                    <Input
                      name="printColor"
                      type="select"
                      value={data.printColor}
                      onChange={handleChange}
                    >
                      <option value="bw">שחור לבן</option>
                      <option value="color">צבע</option>
                    </Input>
                  </FormGroup> */}
                  {/* {data.printColor === "bw" ? ( */}
                  {/* <FormGroup>
                    <Label for="selectedBW">{textPlaceHolderInputs[6]}</Label>
                    <Select
                      options={optionBWList}
                      placeholder="בחר..."
                      value={selectedBWOptions}
                      onChange={handleBWSelect}
                      isSearchable
                      isMulti
                    />
                  </FormGroup> */}
                  {/* <Input
                      name="selectedBW"
                      type="select"
                      value={data.selectedBW}
                      onChange={handleChange}
                    >
                     
                      <option value="A0BW">A0</option>
                      <option value="A3BW">A3</option>
                      <option defult value="A4BW">
                        A4
                      </option>
                      <option value="A5BW">A5</option>
                      <option value="A6BW">A6</option>
                      <option value="BWA4">A4 בריסטול</option>
                      <option value="BWA3">A3 בריסטול</option>
                    </Input> */}
                  {/* ) : ( */}
                  {/* <Input
                      name="selected"
                      type="select"
                      value={data.selected}
                      onChange={handleChange}
                    >
                      <option value="A0">A0</option>
                      <option value="A3">A3</option>
                      <option defult value="A4">
                        A4
                      </option>
                      <option value="A5">A5</option>
                      <option value="A6">A6</option>
                      <option value="A4b">A4 בריסטול</option>
                      <option value="A3b">A3 בריסטול</option>
                    </Input> */}
                  {/* <FormGroup>
                    <Label for="selected">{textPlaceHolderInputs[5]}</Label>

                    <Select
                      isRtl={false}
                      options={optionList}
                      placeholder="בחר..."
                      value={selectedOptions}
                      onChange={handleSelect}
                      isSearchable
                      isMulti
                    />
                  </FormGroup> */}
                  {/* )} */}
                  {/* <Popup
                    trigger={
                      <MDButton
                        variant="gradient"
                        color="mekatnar"
                        circular="true"
                        iconOnly="true"
                        size="small"
                      >
                        <Icon>help_outline</Icon>
                      </MDButton>
                    }
                  >
                    <MDAlert color="mekatnar">
                      <MDBox>
                        <MDTypography variant="h6" color="light">A0 (84.1 * 118.9 ס"מ)</MDTypography>
                        <MDTypography variant="h6" color="light">A3 (29.7 * 42 ס"מ)</MDTypography>
                        <MDTypography variant="h6" color="light">A4 (21 * 29.7 ס"מ)</MDTypography>
                        <MDTypography variant="h6" color="light">A5 (14.85 * 21 ס"מ)</MDTypography>
                        <MDTypography variant="h6" color="light">A6 (10.5 * 14.85 ס"מ)</MDTypography>
                        <MDTypography variant="h6" color="light">A4 בריסטול (21 * 29.7 ס"מ)</MDTypography>
                        <MDTypography variant="h6" color="light">A3 בריסטול (29.7 * 42 ס"מ)</MDTypography>
                      </MDBox>
                    </MDAlert>
                  </Popup> */}
                </FormGroup>
                {/* <FormGroup>
                  <Label for="הערות">הערות</Label>
                  <Input multiline rows={5} onChange={v => setValue(v)} />
                </FormGroup> */}
                <div className="text-center">
                  <MDButton
                    color="mekatnar"
                    size="large"
                    // onClick={clickSubmit}
                    className="btn-new-blue"
                    type="submit"
                  >
                    אישור
                  </MDButton>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        {/* //! fot the pop up warning windoes */}
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
        {/* {NavigateUser()} */}

        {hozlaAdminPrintInfoForm()}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
