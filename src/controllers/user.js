const { User } = require("../models/user");
const { recoverPersonalSignature } = require("@metamask/eth-sig-util");
const jwt = require("jsonwebtoken");

async function signin(req, res) {
	try {
		const { sign } = req.body;
		const recoveredAddress = recoverPersonalSignature({
			data: "Please approve this message.",
			signature: sign,
		});

		let user = await User.findOne({ address: recoveredAddress });
		if (!user) {
			user = new User(req.body);
			user.address = recoveredAddress;
			if (!user.username) {
				user.username = user.address;
			}
		}
		const payload = {
			wallet_address: recoveredAddress,
		};
		let token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "60 days",
		});
		if (!user.tokens) {
			user.tokens = [];
		}
		user.tokens.push(token);
		await user.save();

		res.status(201).send({ user, token });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}

async function getUser(req, res) {
	try {
		res.status(200).send(req.user);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}

module.exports = { signin, getUser };
