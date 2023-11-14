const express = require("express");
const router = express.Router();


const {
  find,
  getuserbyid,
  getuserbypersonalnumber,
  update,
  remove,
  usersbyrole,
  getAllUsers,
  getRegularUsers,
  getAllMenagmentUsers,
  updateTypeUser,
} = require("../../controllers/authentication/user");

router.post("/getuserbyid", getuserbyid);

router.post("/getuserbypersonalnumber", getuserbypersonalnumber);

router.get("/users", find);

router.get("/getAllUsers", getAllUsers);

router.get("/getAllMenagmentUsers", getAllMenagmentUsers);

router.get("/getRegularUsers", getRegularUsers);

router.put("/user/update/:id", update);

router.put("/user/updateTypeUser/:id", updateTypeUser);

router.post("/user/remove/:userId", remove);

router.get("/usersbyrole/:role", usersbyrole);

module.exports = router;
