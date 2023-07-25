/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// @mui material components
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
// import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import { useEffect, useState } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import { Link, useParams } from "react-router-dom";
import Switch from "@mui/material/Switch";

// Images
// import LogoAsana from "assets/images/small-logos/logo-asana.svg";
// import logoGithub from "assets/images/small-logos/github.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  // const Project = ({ image, name }) => (
  //   <MDBox display="flex" alignItems="center" lineHeight={1}>
  //     <MDAvatar src={image} name={name} size="sm" variant="rounded" />
  //     <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
  //       {name}
  //     </MDTypography>
  //   </MDBox>
  // );
  const params = useParams();
  const [isError, setIsError] = useState(false);
  const [requestDB, setRequestDB] = useState([]);
  const [isInfoPressed, setIsInfoPressed] = useState(false);
  const [pressedID, setpressedID] = useState("");
  const textPlaceHolderInputs = [
    "יחידה",
    "ענף",
    "מדור",
    "נייד",
    "שם העבודה",
    "סיווג העבודה",
    "שיטת כריכה",
    "שיטת  צילום",
    "כמות עותקים",
    "שם מוסר העבודה",
    "תאריך מסירת העבודה",
    "שם מקבל העבודה",
    "קובץ להדפסה",
    "סוג דף",
    "תאריך קבלת העבודה",
  ];
  const clearanceOptions = ['בלמ"ס', "שמור", "סודי", "סודי ביותר"];
  // const bindingTypes = ["הידוק", "ספירלה", "חירור", "אחר"];
  // const copyTypes = ["שחור לבן דו צדדי", "צבעוני יחיד", "צבעוני דו צדדי", "שחור לבן יחיד"];
  // const pageTypes = { A4: "A4", A3: "A3", A4b: "A4 בריסטול", A3b: "A3 בריסטול" };
  const MINUTE_MS = 100000;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/HozlaApi/getAllUsers`)
      .then((response) => {
        console.log(response.data);
        setRequestDB(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/HozlaApi/hozlaAdminRequests/`)
  //     .then((response) => {
  //       // console.log(`the object data`);
  //       console.log(response.data);
  //       console.log(params.formID);

  //       setFormData(response.data);

  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       console.log(error.code);
  //       if (error.code === "ERR_BAD_REQUEST") {
  //         setError404(true);
  //       } else {
  //         setErrorDB(true);
  //       }
  //     });
  // }, []);

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  const getWorkStuts = (value) => {
    let stutus = "נשלח";
    let color = "error";
    if (value === 25) {
      stutus = "בקשה נשלחה";
      color = "error";
    } else if (value === 50) {
      stutus = "התקבל במערכת";
      color = "mekatnar";
    } else if (value === 75) {
      stutus = "בהדפסה";
      color = "mekatnar";
    } else if (value === 100) {
      stutus = "מוכן לאיסוף";
      color = "success";
    } else if (value === 125) {
      stutus = "נאסף";
      color = "success";
    } else if (value === 150) {
      stutus = "העבודה נדחתה";
      color = "error";
    }
    return [stutus, color];
  };

  const handleChange = () => {
    // axios.post(`http://localhost:5000/HozlaApi/updateApproved`, ).then((res) => {
    //   // toast.success(`הטופס נשלח בהצלחה`);
    //   // history.push(`/signin`);
    //   console.log(res.data);
    //   // setToraHeilitVolume(response.data.toraHeilitVolumes);
    // });
  };

  const setTypeRequest = (type) => {
    let typeName = "";
    let color = "mekatnar";
    if (type === "0") {
      typeName = "הוצל''א";
      color = "success";
    } else if (type === "1") {
      typeName = "מנהל מערכת ראשי";
      color = "mekatnar";
    } else if (type === "2") {
      typeName = "מנהל מערכת";
      color = "mekatnar";
    } else if (type === "3") {
      typeName = "תורה חילית";
      color = "info";
    }
    return [typeName, color];
  };
  // const convertNum = (num) => {
  //   parseInt()
  // }

  const dbRows = requestDB.map((hozla, index) => ({
    fileID: hozla._id,
    personalNumber: hozla.personalnumber,
    firstName: hozla.firstName,
    lastName: hozla.lastLame,
    userType: (
      <MDBadge
        badgeContent={setTypeRequest(hozla.admin)[0]}
        color={setTypeRequest(hozla.admin)[1]}
        size="sm"
        container
      />
    ),
    approved: (
      <Switch
        checked={hozla.approved}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    ),
  }));

  console.log(`isError ${isError}`);
  return {
    //* the tables headers
    columns: [
      { Header: "id", accessor: "fileID", align: "center" },
      { Header: "מספר אישי", accessor: "personalNumber", align: "center" },
      { Header: "שם פרטי", accessor: "firstName", align: "center" },
      { Header: "שם משפחה", accessor: "lastName", align: "center" },
      { Header: "סוג משתמש", accessor: "userType", align: "center" },
      { Header: "אישור מנהל", accessor: "approved", align: "center" },
    ],

    rows: dbRows,
    dbError: isError,
    setDBerror: setIsError,
  };
}
