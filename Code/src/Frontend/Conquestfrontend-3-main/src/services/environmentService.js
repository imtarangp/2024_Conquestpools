import { env } from "../utils/environment";

export class EnvironmentService {
  getBaseUrl() {
    return env.BASE_URL;
  }
}
