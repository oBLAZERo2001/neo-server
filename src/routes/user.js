const { signin, getUser } = require("../controllers/user");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.get("/", auth, getUser);

router.post("/signin", signin);

module.exports = router;
