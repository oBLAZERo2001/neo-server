const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			validate(value) {
				if (!validator.matches(value.toString(), "^[a-zA-Z0-9_.-]*$")) {
					throw new Error("username not valid");
				}
			},
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
		displayImage: {
			type: String,
			default:
				"https://spriyo.s3.ap-south-1.amazonaws.com/images/default-profile-icon.png",
			required: true,
		},
		tokens: [
			{
				type: String,
				required: true,
			},
		],
	},
	{
		timestamps: true,
	}
);

UserSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.tokens;

	return userObject;
};

UserSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

const User = new mongoose.model("User", UserSchema);
// ADD's or DROP's unique indexes
// User.syncIndexes();

module.exports = { User };
