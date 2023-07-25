const { Users } = require("../db/models/usersModel");
const bcyrpt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const { sendEmailCopnfig } = require("../helpers/emailServices");



const createUser = async (email, password, res, baseUrl) => {
  const emailExists = await Users.findOne({ email: email });
  if (emailExists) {
    return res.status(409).json({ message: "Email already in use" });
  }
  const hashedPassword = await bcyrpt.hash(password, 10);
  const verificationToken = uuidv4();

  const msg = {
    to: email,
    from: "tarassirenko71@gmail.com",
    subject: "Test email confirmation at login",
    text: `Follow the <a href="${baseUrl}/api/users/verify/${verificationToken}">link</a> to confirm your registration.`,
    html: `Follow the <a href="${baseUrl}/api/users/verify/${verificationToken}">link</a> to confirm your registration.`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });

  await Users.create({ email, password: hashedPassword, verificationToken });
  res.status(201).json({ email, subscription: "starter" });
};

const updateUserStatus = async (userId, subscription) => {
  if (!["starter", "pro", "business"].includes(subscription))
    throw new Error("Invalid user status");

   await Users.findOneAndUpdate(
    { _id: userId },
    { $set: { subscription} }
    );
    return await Users.findOne({ _id: userId });
};

const loginUser = async ({ email, password }) => {
    const user = await Users.findOne({ email: email });
      if (!user.verify) {
        throw new Error("You have not verified your email");
      }
  if (!user) {
    throw new Error("There are no registered users with this email");
  }
  const isPasswordValid = await bcyrpt.compare(password, user.password);

  if (!isPasswordValid) throw new Error("Email or password is wrong");

  const token = jwt.sign(
    {
      email: user.email,
      id: user._id.toString(),
      subscription: user.subscription,
    },
    process.env.JWT_SECRET
  );
  await Users.findOneAndUpdate({ email: email }, { $set: { token } });

  return { token, user: { email, password } };
};

const logoutUser = async (userId) => {
  const user = await Users.findOne({ _id: userId });
  if (!user) throw new Error("Not authorized");

  return await Users.findOneAndUpdate(
    { _id: userId },
    { $set: { token: null } }
  );
};
const getCurrentUser = async (userId) => {
  const user = await Users.findOne(
    { _id: userId },
    { email: 1, subscription: 1, _id: 0 }
  );
  if (!user) throw new Error("Not authorized");
  return user;
};

const getUsers = async () => {
  return await Users.find({});
};

const userVerificationCheck = async (verificationToken) => {
    const user = await Users.findOne({ verificationToken });
    if (!user) throw new Error("User not found")
    return await Users.findOneAndUpdate(
       { _id: user.id },
       { $set: { verificationToken: null, verify: true } }
     );
    
};

const reVerification = async (email, baseUrl) => {
  const user = await Users.findOne({ email });
  if (!user) throw new Error("User not found");
  if (user.verify) return null;

  const verificationToken = uuidv4();
  const msg = {
    to: email,
    from: "tarassirenko71@gmail.com",
    subject: "Test email confirmation at login",
    text: `Follow the <a href="${baseUrl}/api/users/verify/${verificationToken}">link</a> to confirm your registration.`,
    html: `Follow the <a href="${baseUrl}/api/users/verify/${verificationToken}">link</a> to confirm your registration.`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });

  return await Users.findOneAndUpdate(
    { _id: user.id },
    { $set: { verificationToken } }
  );
};

module.exports = {
  createUser,
  updateUserStatus,
  loginUser,
  logoutUser,
  getCurrentUser,
  getUsers,
  userVerificationCheck,
  reVerification,
};
