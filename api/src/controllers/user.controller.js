import * as userService from "../services/user.service.js";

export const getUserProfile = async (req, res, next) => {
  try {
    const data = await userService.getUserProfile(req.params.username);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const data = await userService.updateUserProfile(
      req.params.id,
      req.body,
      req.user._id,
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
