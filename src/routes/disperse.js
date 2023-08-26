const { Disperse } = require("../models/disperse");

const router = require("express").Router();

router.post("/", async function (req, res) {
	try {
		const disperse = await new Disperse(req.body).save();
		res.send(disperse);
	} catch (e) {
		console.error(e);
	}
});

router.get("/:address", async function (req, res) {
	try {
		const disperse = await new Disperse.find({
			address: req.params.address,
		})
		res.send(disperse);
	} catch (e) {
		console.error(e);
	}
});

module.exports = router;
