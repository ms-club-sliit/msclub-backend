import { authenticate } from "./Auth.middleware";
import { validateRequest } from "./Validation.middleware";

export default {
	authenticate,
	validateRequest,
};
