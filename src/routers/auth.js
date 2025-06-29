import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserValidationSchema } from "../validation/registerUserValidationSchema.js";
import { loginUserController, registerUserController } from "../controllers/auth.js";
import { loginUserValidationSchema } from "../validation/loginUserValidationSchema.js";

const authRouter = Router();

authRouter.post('/auth/register', validateBody(registerUserValidationSchema), registerUserController);

authRouter.post('/auth/login', validateBody(loginUserValidationSchema), loginUserController);

export default authRouter;