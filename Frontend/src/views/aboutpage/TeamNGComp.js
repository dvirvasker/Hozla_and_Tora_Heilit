/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";

import { Link, Redirect, withRouter } from "react-router-dom";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// reactstrap components
import teamNGogo from "assets/images/NewNGlogoWhite.svg";
import {
  Button,
  ButtonGroup,
  CardBody,
  // Card,
  CardHeader,
  CardTitle,
  Col,
  Collapse,
  Container,
  Row,
} from "reactstrap";

function TeamNGComp() {
  return (
    <Card>
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        borderRadius="lg"
        coloredShadow="mekatnar"
        mx={2}
        mt={-3}
        p={2}
        mb={1}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          המערכת פותחה ע"י
        </MDTypography>
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          צוות NG
        </MDTypography>
        {/* <MDBox component="img" src={teamNGogo} alt="hozlaLogo" width="5rem" alignSelf="center" /> */}
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDTypography variant="h5" fontWeight="medium" mt={1}>
          צוות NG הוא צוות שעוסק בפיתוח מערכות במפקדת קצין הטכנולוגיה והאחזקה הראשי. הצוות ממוקם
          במדור NG בענף תו"ן ומפתח מערכות ייעודיות לחיל הטכנולוגיה והאחזקה בסביבת הWeb .
        </MDTypography>
      </MDBox>
    </Card>

    // <div style={{ height: "450px" }}>
    //   <Row>
    //     <Col xs={12} md={4}></Col>
    //     <Col xs={12} md={4} style={{ textAlign: "center" }}>
    //       <h1 style={{ fontWeight: "bold", fontSize: "40px", marginBottom: "5px" }}>
    //         המערכת פותחה ע"י
    //       </h1>
    //       {theme == "white-content" ? (
    //         <img src={Logo100} style={{ height: "200px", marginBottom: "15px" }}></img>
    //       ) : (
    //         <img src={Logo100_white} style={{ height: "200px", marginBottom: "15px" }}></img>
    //       )}
    //     </Col>
    //     <Col xs={12} md={4}></Col>
    //   </Row>

    //   <Container>
    //     <div style={{ textAlign: "center" }}>
    //       <h3>
    //         צוות מא"ה הוא צוות שעוסק בפיתוח מערכות מידע במפקדת קצין הטכנולוגיה והאחזקה הראשי. הצוות
    //         ממוקם במדור מערכות מידע בענף תו"ן ומפתח מערכות ייעודיות לחיל הטכנולוגיה והאחזקה בסביבת
    //         הWeb.
    //       </h3>
    //     </div>
    //   </Container>
    // </div>
  );
}

export default TeamNGComp;
