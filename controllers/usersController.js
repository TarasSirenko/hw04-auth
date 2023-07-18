const {
  createUser,
  updateUserStatus,
  loginUser,
  logoutUser,
  getCurrentUser,
  // getUsers,
  userVerificationCheck,
  reVerification,
} = require("../services/usersServices");

const createUserController = async (req, res) => {
 await createUser(req.body, res);
};

const updateUserStatusController = async (req, res) => {
    const { _id: userId } = req.user;
    const { subscription } = req.body;
  const contacts = await updateUserStatus(userId, subscription);
  return res.status(200).json(contacts);
};
const loginUserController = async (req, res) => {
  const user = await loginUser(req.body);
  return res.status(200).json(user);
};
const logoutUsertController = async (req, res) => {
    const {_id:userId} = req.user
    const user = await logoutUser(userId);
    if (user) return res.status(204).json("No Content");
};
const getCurrentUserController = async (req, res) => {
      const { _id: userId } = req.user;
  const currentUser = await getCurrentUser(userId);
  return res.status(200).json(currentUser);
};

const getUserController = async (req, res) => {
  // const users = await getUsers();
  return res.status(200).json("good!!!");
};

const userVerificationCheckController = async (req, res) => {
    const { verificationToken } = req.params;
    await userVerificationCheck(verificationToken);
      return res.status(200).json('Verification successful');
};

const reVerificationController = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json("missing required field email");
    const user = await reVerification(email);
    if (!user) return res.status(400).json("Verification has already been passed");
    return res.status(200).json("Verification email sent");
};

module.exports = {
  createUserController,
  updateUserStatusController,
  loginUserController,
  logoutUsertController,
  getCurrentUserController,
  getUserController,
  userVerificationCheckController,
  reVerificationController,
};
