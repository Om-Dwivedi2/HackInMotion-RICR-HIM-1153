import CareerTarget from "../modules/careerTarget/careerTarget.model.js";

export const updateTarget = async (req, res, next) => {
  try {
    const { role, company, jobDescriptionText } = req.body;

    if (!role) {
      return res.status(400).json({ success: false, message: "Target role is required", data: null });
    }

    await CareerTarget.updateMany(
      { userId: req.user._id, isActive: true },
      { $set: { isActive: false } }
    );

    const newTarget = await CareerTarget.create({
      userId: req.user._id,
      role: role.trim(),
      company: company ? company.trim() : "",
      jobDescription: jobDescriptionText ? { rawText: jobDescriptionText } : undefined,
      isActive: true
    });

    return res.status(200).json({
      success: true,
      message: "Career preferences updated successfully",
      data: newTarget
    });
  } catch (error) {
    next(error);
  }
};

export const getActiveTarget = async (req, res, next) => {
  try {
    const target = await CareerTarget.findOne({ userId: req.user._id, isActive: true });
    
    return res.status(200).json({
      success: true,
      message: "Active career target fetched successfully",
      data: target || null
    });
  } catch (error) {
    next(error);
  }
};
