/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */

const router = require("express").Router();
const { request } = require("express");
const HozlaAdminRequest = require("../models/hozlaAdminRequest.model");

router.route("/").get((req, res) => {
  HozlaAdminRequest.find()
    .sort({ status: 1, createdAt: -1 })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getAnnualInfo/:year").get((req, res) => {
  // console.log(req.params.year);
  let countPrintInYear = 0;
  let numBeatsColourful = 0;
  let sumBeatsBlackwhite = 0;
  let sumRequestInYear = 0;
  let dataRequest = [];
  let A0 = 0;
  let A3 = 0;
  let A4 = 0;
  let A5 = 0;
  let A6 = 0;
  let A4b = 0;
  let A3b = 0;
  let dateStartString = "";
  let dateEndString = "";
  let lastTime = "";
  let dateYear = req.params.year;
  HozlaAdminRequest.find()
    .sort({ createdAt: 1 })
    .then((request) => {
      request.map((hozla, index) => {
        // console.log(hozla.updatedAt.getFullYear());
        // console.log(JSON.parse(dateYear));
        if (hozla.updatedAt.getFullYear() === JSON.parse(dateYear)) {
          // console.log(hozla.updatedAt);
          if (hozla.createdAt.getFullYear() === JSON.parse(dateYear)) {
            if (dateStartString === "") {
              dateStartString = hozla.createdAt;
              dateEndString = hozla.updatedAt;
            }
          }
          if (dateEndString <= hozla.updatedAt) {
            dateEndString = hozla.updatedAt;
            if (hozla.updatedAt.getMinutes() < 10) {
              lastTime = `${hozla.updatedAt.getHours()}:0${hozla.updatedAt.getMinutes()}`;
            } else {
              lastTime = `${hozla.updatedAt.getHours()}:${hozla.updatedAt.getMinutes()}`;
            }
          }

          dataRequest = dataRequest.concat(hozla.propPrints);

          // countPrintInYear = Math.round(hozla.numPages) + countPrintInYear;

          // numBeatsColourful =
          //   Math.round(hozla.numColourfulBeats) + numBeatsColourful;
          // sumBeatsBlackwhite =
          //   Math.round(hozla.sumNoColourfulPages) + sumBeatsBlackwhite;

          sumRequestInYear += 1;
        }
      });
      // console.log(dateEndString);
      dataRequest.map((data) => {
        if (data.propCopyType === "b&w2" || data.propCopyType === "b&w1") {
          sumBeatsBlackwhite = Math.round(data.numBeats) + sumBeatsBlackwhite;
        }
        if (data.propCopyType === "color2" || data.propCopyType === "color1") {
          numBeatsColourful = Math.round(data.numBeats) + numBeatsColourful;
        }
        if (data.propPageType === "A0") {
          A0 = Math.round(data.numPages) + A0;
        }
        if (data.propPageType === "A3") {
          A3 = Math.round(data.numPages) + A3;
        }
        if (data.propPageType === "A4") {
          A4 = Math.round(data.numPages) + A4;
        }
        if (data.propPageType === "A5") {
          A5 = Math.round(data.numPages) + A5;
        }
        if (data.propPageType === "A6") {
          A6 = Math.round(data.numPages) + A6;
        }
        if (data.propPageType === "A4b") {
          A4b = Math.round(data.numPages) + A4b;
        }
        if (data.propPageType === "A3b") {
          A3b = Math.round(data.numPages) + A3b;
        }
        countPrintInYear = Math.round(data.numPages) + countPrintInYear;
      });
      console.log(dateStartString);
      console.log(dateEndString);
      // console.log(A0, A3, A4, A5, A6, A4b, A3b);
    })
    .then(() =>
      res.json({
        countPrintInYear,
        numBeatsColourful,
        sumBeatsBlackwhite,
        sumRequestInYear,
        A0,
        A3,
        A4,
        A5,
        A6,
        A4b,
        A3b,
        dateStartString,
        dateEndString,
        lastTime,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getAnafPrintCount/:year").get((req, res) => {
  let dateYear = req.params.year;
  // let dataRequest = [];
  let tun = 0;
  let takom = 0;
  let tom = 0;
  let sadot = 0;
  let aczaka = 0;
  let segel = 0;
  let peer = 0;
  let ergon = 0;
  let shalishot = 0;
  let other = 0;
  HozlaAdminRequest.find()
    .then((request) => {
      request.map((data) => {
        if (data.updatedAt.getFullYear() === JSON.parse(dateYear)) {
          // console.log(JSON.parse(dateYear));
          data.propPrints.map((hozla) => {
            if (data.anaf === `תו"ן` || data.anaf === `תון`) {
              tun = JSON.parse(hozla.numPages) + tun;
            } else if (data.anaf === `תקום` || data.anaf === `תקו"ם`) {
              takom = JSON.parse(hozla.numPages) + takom;
            } else if (data.anaf === `תום` || data.anaf === `תו"ם`) {
              tom = JSON.parse(hozla.numPages) + tom;
            } else if (data.anaf === `שדות` || data.anaf === `שדו"ת`) {
              sadot = JSON.parse(hozla.numPages) + sadot;
            } else if (data.anaf === `אחזקה`) {
              aczaka = JSON.parse(hozla.numPages) + aczaka;
            } else if (data.anaf === `סגל`) {
              segel = JSON.parse(hozla.numPages) + segel;
            } else if (data.anaf === `פאר` || data.anaf === `פא"ר`) {
              peer = JSON.parse(hozla.numPages) + peer;
            } else if (data.anaf === `ארגון`) {
              ergon = JSON.parse(hozla.numPages) + ergon;
            } else if (data.anaf === `שלישות`) {
              shalishot = JSON.parse(hozla.numPages) + shalishot;
            } else {
              other = JSON.parse(hozla.numPages) + other;
            }
          });
        }
      });
    })
    .then(() =>
      res.json({
        tun,
        takom,
        tom,
        sadot,
        aczaka,
        segel,
        peer,
        ergon,
        shalishot,
        other,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const user_card_number = req.body.user_card_number;
  // const unit = req.body.unit;
  //
  // const mador = req.body.mador;
  // const phoneNumber = req.body.phoneNumber;
  // const workName = req.body.workName;
  // const workClearance = req.body.workClearance;
  // const bindingType = req.body.bindingType;
  // const bindingTypeOther = req.body.bindingTypeOther;
  // const copyType = req.body.copyType;
  // const pageType = req.body.pageType;
  // const numOfCopyies = Number(req.body.numOfCopyies);
  // const fullNameAsker = req.body.fullNameAsker;
  // const workGivenDate = Date.parse(req.body.workGivenDate);
  // const fullNameReciver = req.body.fullNameReciver;
  // const workRecivedDate = Date.parse(req.body.workRecivedDate);
  // const files = req.body.files;
  // const status = req.body.status;
  // const order_maker_card_number = req.body.order_maker_card_number;

  // admin
  const hozlaRequestID = req.body.hozlaRequestID;
  const anaf = req.body.anaf;
  const sumColourfulPages = req.body.sumColourfulPages;
  const sumNoColourfulPages = req.body.sumNoColourfulPages;
  const numPages = req.body.numPages;
  const numColourfulBeats = req.body.numColourfulBeats;
  const numNoColourfulBeats = req.body.numNoColourfulBeats;
  const selected = req.body.selected;
  const selectedBW = req.body.selectedBW;
  const twoSides = req.body.twoSides;
  const workName = req.body.workName;
  // const propPrints = req.body.propPrints;
  // console.log(req.body);
  const propPrintsrray = [];
  req.body.propPrints.forEach((element) => {
    const propPrint = {
      propCopyType: element.propCopyType,
      propPageType: element.propPageType,
      numBeats: element.numBeats,
      numPages: element.numPages,
    };
    propPrintsrray.push(propPrint);
  });
  const propPrints = propPrintsrray;

  const newHozlaAdminRequest = new HozlaAdminRequest({
    user_card_number,
    //   unit,

    //   mador,
    //   phoneNumber,
    //   workName,
    //   workClearance,
    //   bindingType,
    //   bindingTypeOther,
    //   copyType,
    //   pageType,
    //   numOfCopyies,
    //   fullNameAsker,
    //   workGivenDate,
    //   fullNameReciver,
    //   workRecivedDate,
    //   files,
    // status,
    // order_maker_card_number,

    // admin
    hozlaRequestID,
    anaf,
    sumColourfulPages,
    sumNoColourfulPages,
    numPages,
    numColourfulBeats,
    numNoColourfulBeats,
    selected,
    selectedBW,
    twoSides,
    workName,
    // propPrints,
    propPrints,
  });
  const formId = newHozlaAdminRequest.save((err, form) => {
    if (err) {
      return res.status(400).json("Error: " + err);
    } else {
      res.send(form.id);
    }
  });
});

router.route("/getAllBeatsTypes/:year").get((req, res) => {
  let dateYear = req.params.year;
  let dataRequest = [];
  let bw2A0 = 0;
  let bw2A3 = 0;
  let bw2A4 = 0;
  let bw2A5 = 0;
  let bw2A6 = 0;
  let bw2A4b = 0;
  let bw2A3b = 0;

  let bw1A0 = 0;
  let bw1A3 = 0;
  let bw1A4 = 0;
  let bw1A5 = 0;
  let bw1A6 = 0;
  let bw1A4b = 0;
  let bw1A3b = 0;

  let color2A0 = 0;
  let color2A3 = 0;
  let color2A4 = 0;
  let color2A5 = 0;
  let color2A6 = 0;
  let color2A4b = 0;
  let color2A3b = 0;

  let color1A0 = 0;
  let color1A3 = 0;
  let color1A4 = 0;
  let color1A5 = 0;
  let color1A6 = 0;
  let color1A4b = 0;
  let color1A3b = 0;
  HozlaAdminRequest.find()
    .then((request) => {
      request.map((data, index) => {
        // console.log(hozla.updatedAt.getFullYear());
        // console.log(JSON.parse(dateYear));
        if (data.updatedAt.getFullYear() === JSON.parse(dateYear)) {
          dataRequest = dataRequest.concat(data.propPrints);
        }
      });
      dataRequest.map((hozla) => {
        if (hozla.propCopyType === "b&w2") {
          if (hozla.propPageType === "A0") {
            bw2A0 = Math.round(hozla.numBeats) + bw2A0;
          }
          if (hozla.propPageType === "A3") {
            bw2A3 = Math.round(hozla.numBeats) + bw2A3;
          }
          if (hozla.propPageType === "A4") {
            bw2A4 = Math.round(hozla.numBeats) + bw2A4;
          }
          if (hozla.propPageType === "A5") {
            bw2A5 = Math.round(hozla.numBeats) + bw2A5;
          }
          if (hozla.propPageType === "A6") {
            bw2A6 = Math.round(hozla.numBeats) + bw2A6;
          }
          if (hozla.propPageType === "A4b") {
            bw2A4b = Math.round(hozla.numBeats) + bw2A4b;
          }
          if (hozla.propPageType === "A3b") {
            bw2A3b = Math.round(hozla.numBeats) + bw2A3b;
          }
        }
        if (hozla.propCopyType === "b&w1") {
          if (hozla.propPageType === "A0") {
            bw1A0 = Math.round(hozla.numBeats) + bw1A0;
          }
          if (hozla.propPageType === "A3") {
            bw1A3 = Math.round(hozla.numBeats) + bw1A3;
          }
          if (hozla.propPageType === "A4") {
            bw1A4 = Math.round(hozla.numBeats) + bw1A4;
          }
          if (hozla.propPageType === "A5") {
            bw1A5 = Math.round(hozla.numBeats) + bw1A5;
          }
          if (hozla.propPageType === "A6") {
            bw1A6 = Math.round(hozla.numBeats) + bw1A6;
          }
          if (hozla.propPageType === "A4b") {
            bw1A4b = Math.round(hozla.numBeats) + bw1A4b;
          }
          if (hozla.propPageType === "A3b") {
            bw1A3b = Math.round(hozla.numBeats) + bw1A3b;
          }
        }
        if (hozla.propCopyType === "color2") {
          if (hozla.propPageType === "A0") {
            color2A0 = Math.round(hozla.numBeats) + color2A0;
          }
          if (hozla.propPageType === "A3") {
            color2A3 = Math.round(hozla.numBeats) + color2A3;
          }
          if (hozla.propPageType === "A4") {
            color2A4 = Math.round(hozla.numBeats) + color2A4;
          }
          if (hozla.propPageType === "A5") {
            color2A5 = Math.round(hozla.numBeats) + color2A5;
          }
          if (hozla.propPageType === "A6") {
            color2A6 = Math.round(hozla.numBeats) + color2A6;
          }
          if (hozla.propPageType === "A4b") {
            color2A4b = Math.round(hozla.numBeats) + color2A4b;
          }
          if (hozla.propPageType === "A3b") {
            color2A3b = Math.round(hozla.numBeats) + color2A3b;
          }
        }
        if (hozla.propCopyType === "color1") {
          if (hozla.propPageType === "A0") {
            color1A0 = Math.round(hozla.numBeats) + color1A0;
          }
          if (hozla.propPageType === "A3") {
            color1A3 = Math.round(hozla.numBeats) + color1A3;
          }
          if (hozla.propPageType === "A4") {
            color1A4 = Math.round(hozla.numBeats) + color1A4;
          }
          if (hozla.propPageType === "A5") {
            color1A5 = Math.round(hozla.numBeats) + color1A5;
          }
          if (hozla.propPageType === "A6") {
            color1A6 = Math.round(hozla.numBeats) + color1A6;
          }
          if (hozla.propPageType === "A4b") {
            color1A4b = Math.round(hozla.numBeats) + color1A4b;
          }
          if (hozla.propPageType === "A3b") {
            color1A3b = Math.round(hozla.numBeats) + color1A3b;
          }
        }
      });
      console.log(bw2A0, bw2A3, bw2A4, bw2A5, bw2A6, bw2A4b, bw2A3b);
      console.log(bw1A0, bw1A3, bw1A4, bw1A5, bw1A6, bw1A4b, bw1A3b);
      console.log(
        color2A0,
        color2A3,
        color2A4,
        color2A5,
        color2A6,
        color2A4b,
        color2A3b
      );
      console.log(
        color1A0,
        color1A3,
        color1A4,
        color1A5,
        color1A6,
        color1A4b,
        color1A3b
      );
    })
    .then(() =>
      res.json({
        bw2A0,
        bw2A3,
        bw2A4,
        bw2A5,
        bw2A6,
        bw2A4b,
        bw2A3b,
        bw1A0,
        bw1A3,
        bw1A4,
        bw1A5,
        bw1A6,
        bw1A4b,
        bw1A3b,
        color2A0,
        color2A3,
        color2A4,
        color2A5,
        color2A6,
        color2A4b,
        color2A3b,
        color1A0,
        color1A3,
        color1A4,
        color1A5,
        color1A6,
        color1A4b,
        color1A3b,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/:id").get((req, res) => {
//   HozlaAdminRequest.findById(req.params.id)
//     .then((request) => res.json(request))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

router.route("/:id").delete((req, res) => {
  HozlaAdminRequest.findByIdAndDelete(req.params.id)
    .then(() => res.json("HozlaRequest deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/deleteAllDoc").post((req, res) => {
  HozlaAdminRequest.deleteMany()
    .then(() => res.json("HozlaRequest deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:hozlaRequestID").get((req, res) => {
  HozlaAdminRequest.findOne({ hozlaRequestID: req.params.hozlaRequestID })
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/first/Doc").get((req, res) => {
  HozlaAdminRequest.findOne()
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:hozlaRequestID").post((req, res) => {
  HozlaAdminRequest.findOne({
    hozlaRequestID: req.params.hozlaRequestID,
  })
    .then((request) => {
      request.user_card_number = req.body.user_card_number;
      // request.unit = req.body.unit;

      // request.mador = req.body.mador;
      // request.phoneNumber = req.body.phoneNumber;
      // request.workName = req.body.workName;
      // request.workClearance = req.body.workClearance;
      // request.bindingType = req.body.bindingType;
      // request.bindingTypeOther = req.body.bindingTypeOther;
      // request.copyType = req.body.copyType;
      // request.pageType = req.body.pageType;
      // request.numOfCopyies = Number(req.body.numOfCopyies);
      // request.fullNameAsker = req.body.fullNameAsker;
      // request.workGivenDate = Date.parse(req.body.workGivenDate);
      // request.fullNameReciver = req.body.fullNameReciver;
      // request.workRecivedDate = Date.parse(req.body.workRecivedDate);
      // request.files = req.body.files;
      // request.hozlaRequestID = req.body.hozlaRequestID;
      request.anaf = req.body.anaf;
      request.status = req.body.status;
      request.order_maker_card_number = req.body.order_maker_card_number;

      // admin
      request.sumColourfulPages = req.body.sumColourfulPages;
      request.sumNoColourfulPages = req.body.sumNoColourfulPages;
      request.numPages = req.body.numPages;
      request.numColourfulBeats = req.body.numColourfulBeats;
      request.numNoColourfulBeats = req.body.numNoColourfulBeats;
      request.selected = req.body.selected;
      request.selectedBW = req.body.selectedBW;
      request.twoSides = req.body.twoSides;
      request.workName = req.body.workName;
      // request.propPrints = req.body.propPrints;
      const propPrintsrray = [];
      req.body.propPrints.forEach((element) => {
        const propPrint = {
          propCopyType: element.propCopyType,
          propPageType: element.propPageType,
          numBeats: element.numBeats,
          numPages: element.numPages,
        };
        propPrintsrray.push(propPrint);
      });
      request.propPrints = propPrintsrray;

      request
        .save()
        .then(() => res.json("HozlaRequest updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
