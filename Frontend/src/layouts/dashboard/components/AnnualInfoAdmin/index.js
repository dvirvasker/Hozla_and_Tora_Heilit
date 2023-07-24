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
/* eslint-disable no-lonely-if */
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
// import PrintTwoToneIcon from "@mui/icons-material/PrintTwoTone";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

// import JSPDF from "jspdf";
// import autoTable from "jspdf-autotable";
import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";

import HozlaLogo from "assets/images/hozlaLogo.png";

function AnnualInfoAdmin() {
  const currentDate = new Date();
  console.log(currentDate);
  let dateString = "";
  if (currentDate.getMonth() + 1 >= 10) {
    if (currentDate.getDate() >= 10) {
      dateString = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`;
    } else {
      dateString = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-0${currentDate.getDate()}`;
    }
  } else {
    if (currentDate.getDate() >= 10) {
      dateString = `${currentDate.getFullYear()}-0${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`;
    } else {
      dateString = `${currentDate.getFullYear()}-0${
        currentDate.getMonth() + 1
      }-0${currentDate.getDate()}`;
    }
  }
  // const params = useParams();
  // const [formData, setFormData] = useState({});
  // const [error404, setError404] = useState(false);
  // const [errorDB, setErrorDB] = useState(false);
  // // * data from database
  const [dataFromDB, setDataFromDB] = useState({
    countPrintInYear: 0,
    numBeatsColourful: 0,
    sumBeatsBlackwhite: 0,
    sumRequestInYear: 0,
    A0: 0,
    A3: 0,
    A4: 0,
    A5: 0,
    A6: 0,
    A4b: 0,
    A3b: 0,
    dateStartString: "",
    dateEndString: "",
    lastTime: "",
  });
  const [printData, setPrintData] = useState({
    bw2A0: 0,
    bw2A3: 0,
    bw2A4: 0,
    bw2A5: 0,
    bw2A6: 0,
    bw2A4b: 0,
    bw2A3b: 0,
    bw1A0: 0,
    bw1A3: 0,
    bw1A4: 0,
    bw1A5: 0,
    bw1A6: 0,
    bw1A4b: 0,
    bw1A3b: 0,
    color2A0: 0,
    color2A3: 0,
    color2A4: 0,
    color2A5: 0,
    color2A6: 0,
    color2A4b: 0,
    color2A3b: 0,
    color1A0: 0,
    color1A3: 0,
    color1A4: 0,
    color1A5: 0,
    color1A6: 0,
    color1A4b: 0,
    color1A3b: 0,
  });
  // const [text, setText] = useState("");
  // const getDaysDiff = (dateToCheck) => {
  //   const day = new Date().getDate();
  //   const mounth = new Date().getMonth() + 1;
  //   const year = new Date().getFullYear();
  //   const currentDate = Date.parse(`${year}-${mounth}-${day}`);

  //   // console.log(dateToCheck);
  //   // console.log(`${year}-${mounth}-${day}`);
  //   // console.log(currentDate);
  //   // console.log(Date.parse(dateToCheck));
  //   const diff = Math.abs(currentDate - Date.parse(dateToCheck)) / (1000 * 3600 * 24);
  //   // console.log(diff);
  //   return diff;
  // };

  const params = useParams();
  const [formData, setFormData] = useState({});
  const year = new Date().getFullYear();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/HozlaApi/hozlaAdminRequests/getAnnualInfo/${year}`)
      .then((response) => {
        if (response !== undefined) {
          setFormData(response.data);
          // formData.forEach((num) => {
          setDataFromDB({
            ...dataFromDB,
            countPrintInYear: response.data.countPrintInYear,
            numBeatsColourful: response.data.numBeatsColourful,
            sumBeatsBlackwhite: response.data.sumBeatsBlackwhite,
            sumRequestInYear: response.data.sumRequestInYear,
            A0: response.data.A0,
            A3: response.data.A3,
            A4: response.data.A4,
            A5: response.data.A5,
            A6: response.data.A6,
            A4b: response.data.A4b,
            A3b: response.data.A3b,
            dateStartString: response.data.dateStartString.split("T")[0],
            dateEndString: response.data.dateEndString.split("T")[0],
            lastTime: response.data.lastTime,
          });
        } else {
          setDataFromDB({
            ...dataFromDB,
            countPrintInYear: 0,
            numBeatsColourful: 0,
            sumBeatsBlackwhite: 0,
            sumRequestInYear: 0,
            A0: 0,
            A3: 0,
            A4: 0,
            A5: 0,
            A6: 0,
            A4b: 0,
            A3b: 0,
            dateStartString: 0,
            dateEndString: 0,
            lastTime: 0,
          });
        }
        // console.log(`the object data`);
        // console.log(response.data);

        // axios.get(`http://localhost:5000/HozlaApi/hozlaAdminRequests/first/Doc`).then((res) => {
        //   // console.log(`the object data`);
        //   console.log(getDaysDiff(res.data.createdAt.split("T")[0]));

        //   // change to 365
        //   if (getDaysDiff(res.data.createdAt.split("T")[0]) > 365) {
        //     axios
        //       .post(`http://localhost:5000/HozlaApi/hozlaAdminRequests/deleteAllDoc`)
        //       .then((delRespone) => {
        //         console.log(delRespone.data);
        //       })
        //       .catch((error) => {
        //         console.log(error);
        //         // setIsError(true);
        //       });
        //   }
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
    axios
      .get(`http://localhost:5000/HozlaApi/hozlaAdminRequests/getAllBeatsTypes/${year}`)
      .then((res) => {
        console.log(res.data);
        setPrintData({
          ...printData,
          bw2A0: res.data.bw2A0,
          bw2A3: res.data.bw2A3,
          bw2A4: res.data.bw2A4,
          bw2A5: res.data.bw2A5,
          bw2A6: res.data.bw2A6,
          bw2A4b: res.data.bw2A4b,
          bw2A3b: res.data.bw2A3b,
          bw1A0: res.data.bw1A0,
          bw1A3: res.data.bw1A3,
          bw1A4: res.data.bw1A4,
          bw1A5: res.data.bw1A5,
          bw1A6: res.data.bw1A6,
          bw1A4b: res.data.bw1A4b,
          bw1A3b: res.data.bw1A3b,
          color2A0: res.data.color2A0,
          color2A3: res.data.color2A3,
          color2A4: res.data.color2A4,
          color2A5: res.data.color2A5,
          color2A6: res.data.color2A6,
          color2A4b: res.data.color2A4b,
          color2A3b: res.data.color2A3b,
          color1A0: res.data.color1A0,
          color1A3: res.data.color1A3,
          color1A4: res.data.color1A4,
          color1A5: res.data.color1A5,
          color1A6: res.data.color1A6,
          color1A4b: res.data.color1A4b,
          color1A3b: res.data.color1A3b,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.code);
        // if (error.code === "ERR_BAD_REQUEST") {
        //   setError404(true);
        // } else {
        //   setErrorDB(true);
        // }
      });
  }, []);

  // const getAllBeatsTypes = () => {

  // };

  // console.log(formData);
  console.log(params);

  // const createPDF = () => {
  //   const doc = new JSPDF({
  //     unit: "px",
  //     format: "a4",
  //   });
  //   doc.text(
  //     `${dataFromDB.dateStartString.split("T")[0]} ${dataFromDB.dateEndString.split("T")[0]}`,
  //     200,
  //     20
  //   );
  //   // doc.text(`${dataFromDB.dateEndString.split("T")[0]}`, 250, 20);
  //   // doc.text("Hello world!", 30, 10);
  //   autoTable(doc, {
  //     head: [["page type", "amount pages"]],
  //     body: [
  //       ["A0", `${dataFromDB.A0}`],
  //       ["A3", `${dataFromDB.A3}`],
  //       ["A4", `${dataFromDB.A4}`],
  //       ["A5", `${dataFromDB.A5}`],
  //       ["A6", `${dataFromDB.A6}`],
  //       ["A4 Bristol", `${dataFromDB.A4b}`],
  //       ["A3 Bristol", `${dataFromDB.A3b}`],
  //     ],
  //   });
  //   doc.save(
  //     `דוח שנתי ${dataFromDB.dateStartString.split("T")[0]} ${
  //       dataFromDB.dateEndString.split("T")[0]
  //     }.pdf`
  //   );
  // };

  const createPDFData = () => {
    // getAllBeatsTypes();
    console.log(`data ${printData}`);
    const props = {
      outputType: OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: `דוח שנתי ${dataFromDB.dateStartString} ${dataFromDB.dateEndString}`,
      orientationLandscape: false,
      compress: true,
      logo: {
        src: HozlaLogo,
        type: "PNG", // optional, when src= data:uri (nodejs case)
        width: 53.33, // aspect ratio = width/height
        height: 26.66,
        margin: {
          top: 0, // negative or positive num, from the current position
          left: 0, // negative or positive num, from the current position
        },
      },
      stamp: {
        inAllPages: true, // by default = false, just in the last page
        // src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
        // type: "JPG", // optional, when src= data:uri (nodejs case)
        width: 20, // aspect ratio = width/height
        height: 20,
        margin: {
          top: 0, // negative or positive num, from the current position
          left: 0, // negative or positive num, from the current position
        },
      },
      business: {
        name: "Hozla",
        address: "Hozla System",
        // phone: "(+355) 069 11 11 111",
        // email: "email@example.com",
        // email_1: "info@example.al",
        website: "Annual information",
      },
      contact: {
        label: "Number Request:",
        name: `${formData.sumRequestInYear}`,
        address: `Sum Pages: ${formData.countPrintInYear}`,
        phone: `Sum B&W Beats: ${formData.sumBeatsBlackwhite}`,
        email: `Sum Color Beats: ${formData.numBeatsColourful}`,
        otherInfo: "hozla",
      },
      invoice: {
        label: "Invoice #: ",
        num: `${dateString} ${currentDate.toLocaleTimeString()}`,
        invDate: `Start Date: ${dataFromDB.dateStartString}`,
        invGenDate: `Last Updated Date: ${dataFromDB.dateEndString}`,
        headerBorder: false,
        tableBodyBorder: false,
        header: [
          {
            title: "#",
            style: {
              width: 20,
            },
          },
          {
            title: "Type",
            style: {
              width: 80,
            },
          },
          // {
          //   title: "Description ",
          //   style: {
          //     width: 50,
          //   },
          // },
          {
            title: "Quantity",
            style: {
              width: 30,
            },
          },

          {
            title: "Price",
            style: {
              width: 30,
            },
          },
          {
            title: "Total",
            style: {
              width: 30,
            },
          },
          // { title: "Total" },
        ],
        table: [
          [1, "A0", `${dataFromDB.A0}`, `${dataFromDB.A0}`, `${dataFromDB.A0}`],
          [2, "A3", `${dataFromDB.A3}`, `${dataFromDB.A3}`, `${dataFromDB.A3}`],
          [3, "A4", `${dataFromDB.A4}`, `${dataFromDB.A4}`, `${dataFromDB.A4}`],
          [4, "A5", `${dataFromDB.A5}`, `${dataFromDB.A5}`, `${dataFromDB.A5}`],
          [5, "A6", `${dataFromDB.A6}`, `${dataFromDB.A6}`, `${dataFromDB.A6}`],
          [6, "A4 Bristol", `${dataFromDB.A4b}`, `${dataFromDB.A4b}`, `${dataFromDB.A4b}`],
          [7, "A3 Bristol", `${dataFromDB.A3b}`, `${dataFromDB.A3b}`, `${dataFromDB.A3b}`],
          // [
          //   8,
          //   "beats B&W",
          //   "sum beats of black and white",
          //   `${dataFromDB.sumBeatsBlackwhite}`,
          //   `${dataFromDB.sumBeatsBlackwhite}`,
          //   `${dataFromDB.sumBeatsBlackwhite}`,
          // ],
          // [
          //   9,
          //   "beats color",
          //   "Sum beats of color",
          //   `${dataFromDB.numBeatsColourful}`,
          //   `${dataFromDB.numBeatsColourful}`,
          //   `${dataFromDB.numBeatsColourful}`,
          // ],
          [
            8,
            "Beats B&W 2 sides - A0",
            `${printData.bw2A0}`,
            `${printData.bw2A0}`,
            `${printData.bw2A0}`,
          ],
          [
            9,
            "Beats b&w 2 sides - A3",
            `${printData.bw2A3}`,
            `${printData.bw2A3}`,
            `${printData.bw2A3}`,
          ],
          [
            10,
            "Beats B&W 2 sides - A4",
            `${printData.bw2A4}`,
            `${printData.bw2A4}`,
            `${printData.bw2A4}`,
          ],
          [
            11,
            "Beats B&W2 sides - A5",
            `${printData.bw2A5}`,
            `${printData.bw2A5}`,
            `${printData.bw2A5}`,
          ],
          [
            12,
            "Beats B&W 2 sides - A6",
            `${printData.bw2A6}`,
            `${printData.bw2A6}`,
            `${printData.bw2A6}`,
          ],
          [
            13,
            "Beats B&W 2 sides - A4 Bristol",
            `${printData.bw2A4b}`,
            `${printData.bw2A4b}`,
            `${printData.bw2A4b}`,
          ],
          [
            14,
            "Beats B&W 2 sides - A3 Bristol",
            `${printData.bw2A3b}`,
            `${printData.bw2A3b}`,
            `${printData.bw2A3b}`,
          ],
          [
            15,
            "Beats B&W 1 side- A0",
            `${printData.bw1A0}`,
            `${printData.bw1A0}`,
            `${printData.bw1A0}`,
          ],
          [
            16,
            "Beats B&W 1 side - A3",
            `${printData.bw1A3}`,
            `${printData.bw1A3}`,
            `${printData.bw1A3}`,
          ],
          [
            17,
            "Beats B&W 1 side - A4",
            `${printData.bw1A4}`,
            `${printData.bw1A4}`,
            `${printData.bw1A4}`,
          ],
          [
            18,
            "Beats B&W 1 side - A5",
            `${printData.bw1A5}`,
            `${printData.bw1A5}`,
            `${printData.bw1A5}`,
          ],
          [
            19,
            "Beats B&W 1 side - A6",
            `${printData.bw1A6}`,
            `${printData.bw1A6}`,
            `${printData.bw1A6}`,
          ],
          [
            20,
            "Beats B&W 1 side - A4 Bristol",
            `${printData.bw1A4b}`,
            `${printData.bw1A4b}`,
            `${printData.bw1A4b}`,
          ],
          [
            21,
            "Beats B&W 1 side - A3 Bristol",
            `${printData.bw1A3b}`,
            `${printData.bw1A3b}`,
            `${printData.bw1A3b}`,
          ],
          [
            22,
            "Beats color 2 sides - A0",
            `${printData.color2A0}`,
            `${printData.color2A0}`,
            `${printData.color2A0}`,
          ],
          [
            23,
            "Beats color 2 sides - A3",
            `${printData.color2A3}`,
            `${printData.color2A3}`,
            `${printData.color2A3}`,
          ],
          [
            24,
            "Beats color 2 sides - A4",
            `${printData.color2A4}`,
            `${printData.color2A4}`,
            `${printData.color2A4}`,
          ],
          [
            25,
            "Beats color 2 sides - A5",
            `${printData.color2A5}`,
            `${printData.color2A5}`,
            `${printData.color2A5}`,
          ],
          [
            26,
            "Beats color 2 sides - A6",
            `${printData.color2A6}`,
            `${printData.color2A6}`,
            `${printData.color2A6}`,
          ],
          [
            27,
            "Beats color 2 sides - A4 Bristol",
            `${printData.color2A4b}`,
            `${printData.color2A4b}`,
            `${printData.color2A4b}`,
          ],
          [
            28,
            "Beats color 2 sides - A3 Bristol",
            `${printData.color2A3b}`,
            `${printData.color2A3b}`,
            `${printData.color2A3b}`,
          ],
          [
            29,
            "Beats color 1 side - A0",
            `${printData.color1A0}`,
            `${printData.color1A0}`,
            `${printData.color1A0}`,
          ],
          [
            30,
            "Beats color 1 side - A3",
            `${printData.color1A3}`,
            `${printData.color1A3}`,
            `${printData.color1A3}`,
          ],
          [
            31,
            "Beats color 1 side - A4",
            `${printData.color1A4}`,
            `${printData.color1A4}`,
            `${printData.color1A4}`,
          ],
          [
            32,
            "Beats color 1 side - A5",
            `${printData.color1A5}`,
            `${printData.color1A5}`,
            `${printData.color1A5}`,
          ],
          [
            33,
            "Beats color 1 side - A6",
            `${printData.color1A6}`,
            `${printData.color1A6}`,
            `${printData.color1A6}`,
          ],
          [
            34,
            "Beats color 1 side - A4 Bristol",
            `${printData.color1A4b}`,
            `${printData.color1A4b}`,
            `${printData.color1A4b}`,
          ],
          [
            35,
            "Beats color 1 side - A3 Bristol",
            `${printData.color1A3b}`,
            `${printData.color1A3b}`,
            `${printData.color1A3b}`,
          ],
        ],
        additionalRows: [
          {
            col1: "Total:",
            col2: `${
              dataFromDB.A0 +
              dataFromDB.A3 +
              dataFromDB.A4 +
              dataFromDB.A5 +
              dataFromDB.A6 +
              dataFromDB.A4b +
              dataFromDB.A3b
            }`,
            col3: "₪",
            style: {
              fontSize: 14, // optional, default 12
            },
          },
          // {
          //   col1: "VAT:",
          //   col2: "20",
          //   col3: "%",
          //   style: {
          //     fontSize: 10, // optional, default 12
          //   },
          // },
          // {
          //   col1: "SubTotal:",
          //   col2: "116,199.90",
          //   col3: "ALL",
          //   style: {
          //     fontSize: 10, // optional, default 12
          //   },
          // },
        ],
        invDescLabel: "created",
        invDesc: currentDate,
      },
      footer: {
        text: "The invoice is created on a computer.",
      },
      pageEnable: true,
      pageLabel: "Page ",
    };
    jsPDFInvoiceTemplate(props);
  };

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography
          variant="h6"
          fontWeight="medium"
          style={{
            position: "absolute",
          }}
        >
          {" "}
          מידע שנתי
        </MDTypography>
        <Grid container justifyContent="flex-end">
          <MDButton onClick={createPDFData} lineHeight={0} variant="text" color="mekatnar" iconOnly>
            <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
              print
            </Icon>
          </MDButton>
        </Grid>
        <MDBox mt={0} mb={5}>
          <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
            <MDTypography variant="button" color="text" fontWeight="medium">
              החל מ:{" "}
              <MDTypography variant="button" color="text" fontWeight="regular">
                {dataFromDB.dateStartString}
              </MDTypography>
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="medium">
              עודכן לאחרונה:{" "}
              <MDTypography variant="button" color="text" fontWeight="regular">
                {dataFromDB.dateEndString}
              </MDTypography>{" "}
              ב:{" "}
              <MDTypography variant="button" color="text" fontWeight="regular">
                {dataFromDB.lastTime}
              </MDTypography>
            </MDTypography>
          </Grid>

          {/* <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              24%
            </MDTypography>{" "}
            this month
          </MDTypography> */}
        </MDBox>
      </MDBox>
      <MDBox mt={-2} px={3}>
        <Grid container spacing={1} columns={22}>
          <Grid item xs={10}>
            <TimelineItem
              color="mekatnar"
              // icon="inventory_2"
              icon={<Icon>print</Icon>}
              title="כמות הדפים שהודפסו"
              dateTime={dataFromDB.countPrintInYear}
            />
            {/* <TimelineItem
          color="success"
          icon={<Icon>access_time</Icon>}
          title="כמות הדפים שהודפסו היום"
          dateTime={dataFromDB.countPrintInDay}
        /> */}
            <TimelineItem
              color="warning"
              // icon="payment"
              icon={<Icon>opacity_sharp</Icon>}
              title="מספר פעימות צבעוני"
              dateTime={dataFromDB.numBeatsColourful}
            />
            <TimelineItem
              color="info"
              // icon="shopping_cart"
              icon={<Icon>opacity_sharp</Icon>}
              title="מספר פעימות שחור לבן"
              dateTime={dataFromDB.sumBeatsBlackwhite}
            />
            <TimelineItem
              color="success"
              // icon="shopping_cart"
              icon={<Icon>request_quote</Icon>}
              title="כמות בקשות"
              dateTime={dataFromDB.sumRequestInYear}
              lastItem
            />
          </Grid>

          {/* <MDTypography variant="h6" fontWeight="medium">
            מידע שנתי
          </MDTypography> */}
          {/* <Grid container> */}
          <Grid item xs={5} columns={20} lg={5} md={5}>
            <TimelineItem
              color="mekatnar"
              // icon="inventory_2"
              icon={<Icon>layers</Icon>}
              title="A0"
              dateTime={dataFromDB.A0}
            />
            {/* <TimelineItem
          color="success"
          icon={<Icon>access_time</Icon>}
          title="כמות הדפים שהודפסו היום"
          dateTime={dataFromDB.countPrintInDay}
        /> */}
            <TimelineItem
              color="warning"
              // icon="payment"
              icon={<Icon>layers</Icon>}
              title="A3"
              dateTime={dataFromDB.A3}
            />
            <TimelineItem
              color="info"
              // icon="shopping_cart"
              icon={<Icon>layers</Icon>}
              title="A4"
              dateTime={dataFromDB.A4}
            />
            <TimelineItem
              color="success"
              // icon="shopping_cart"
              icon={<Icon>layers</Icon>}
              title="A5"
              dateTime={dataFromDB.A5}
              lastItem
            />
            {/* <TimelineItem
          color="primary"
          icon="vpn_key"
          title="New card added for order #4395133"
          dateTime="18 DEC 4:54 AM"
          lastItem
        /> */}
          </Grid>
          <Grid item xs={5} columns={20} lg={5} md={5}>
            <TimelineItem
              color="mekatnar"
              // icon="inventory_2"
              icon={<Icon>layers</Icon>}
              title="A6"
              dateTime={dataFromDB.A6}
            />
            {/* <TimelineItem
          color="success"
          icon={<Icon>access_time</Icon>}
          title="כמות הדפים שהודפסו היום"
          dateTime={dataFromDB.countPrintInDay}
        /> */}
            <TimelineItem
              color="warning"
              // icon="payment"
              icon={<Icon>layers</Icon>}
              title="A4 בריסטול"
              dateTime={dataFromDB.A4b}
            />
            <TimelineItem
              color="info"
              // icon="shopping_cart"
              icon={<Icon>layers</Icon>}
              title="A3 בריסטול"
              dateTime={dataFromDB.A3b}
              lastItem
            />
            {/* <TimelineItem
          color="primary"
          icon="vpn_key"
          title="New card added for order #4395133"
          dateTime="18 DEC 4:54 AM"
          lastItem
        /> */}
          </Grid>
        </Grid>
        {/* </Grid> */}
      </MDBox>
    </Card>
  );
}

export default AnnualInfoAdmin;
