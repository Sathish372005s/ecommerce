import User from "../models/user.model.js";

export const getProfile = async (req, res) => {
  try {
    // TODO
  } catch (error) {
    res.status(500).json({ message: "Get profile failed", error });
  }
};

export const updateProfile = async (req, res) => {
  try {
    // TODO
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    // TODO
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};

export const addfcmtoken = async (req, res) => {
  try {
    const id = req.user._id;
    const { fcmToken } = req.body;
    if (!fcmToken) {
      return res.status(400).json({ msg: "Token is required" });
    }
    await User.findByIdAndUpdate(id, { fcmToken });
    res.status(200).json({ msg: "Token added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Add FCM token failed", error });
  }
}