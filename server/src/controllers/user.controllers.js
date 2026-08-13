import User from "../modules/auth/user.model.js";

export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone } = req.body;

    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found", data: null });
    }

    if (name) user.name = name.trim();
    if (phone !== undefined) user.phone = phone.trim();

    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: { user: userObj }
    });
  } catch (error) {
    next(error);
  }
};
