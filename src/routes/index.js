const router = require("express").Router();
const user = require("./user");
const disperse = require("./disperse");

router.use("/user", user);
router.use("/disperse", disperse);

module.exports = { routes: router };