import type { VercelRequest, VercelResponse } from "@vercel/node";
import { MockController } from "../../../src/controllers/Mock.controller";

export default (request: VercelRequest, response: VercelResponse) =>
  new MockController(request, response);
