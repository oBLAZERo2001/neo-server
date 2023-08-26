const mongoose = require("mongoose");
const validator = require("validator");

const DisperseSchema = new mongoose.Schema(
	{
		userid: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		address: {
			type: String,
			trim: true,
			unique: true,
			validate(value) {
				if (!validator.isEthereumAddress(value.toString())) {
					throw new Error("invalid address");
				}
			},
		},
		disperseString: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			validate(value) {
				if (!validator.isEthereumAddress(value.toString())) {
					throw new Error("invalid address");
				}
			},
		},
	},
	{
		timestamps: true,
	}
);

const Disperse = new mongoose.model("Disperse", DisperseSchema);

module.exports = { Disperse };
