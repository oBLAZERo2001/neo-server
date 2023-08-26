const mongoose = require("mongoose");
const validator = require("validator");

const DisperseSchema = new mongoose.Schema(
	{
		address: {
			type: String,
			trim: true,
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
