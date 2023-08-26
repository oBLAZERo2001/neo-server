const { User } = require("../models/user");
const { recoverPersonalSignature } = require("@metamask/eth-sig-util");

async function signin(req, res) {
	try {
		const { sign } = req.body;
		const recoveredAddress = recoverPersonalSignature({
			data: "Please approve this message.",
			signature: sign,
		});

		let user = await User.findOne({ address: recoveredAddress });
		let token;
		if (!user) {
			user = new User(req.body);
			user.address = recoveredAddress;
			if (!user.username) {
				user.username = user.address;
			}
		}

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

async function login(req, res) {
	try {
		const { sign } = req.body;

		const recoveredAddress = recoverPersonalSignature({
			data: "Please approve this message.",
			signature: sign,
		});

		let token = await createUser(recoveredAddress);
		res.send({ token });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}

module.exports = { signin, getUser };
