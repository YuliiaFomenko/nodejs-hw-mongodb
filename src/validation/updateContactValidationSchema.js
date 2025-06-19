import Joi from "joi";
import { CONTACT_TYPES } from "../constants/contactTypes";

export const updateContactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().min(3).max(20),
  isFavorite: Joi.boolean().default(false),
  contactType: Joi.string().valid(...Object.values(CONTACT_TYPES)).default(CONTACT_TYPES.PERSONAL),
});
