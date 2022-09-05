import type { VercelRequest, VercelResponse } from "@vercel/node";
import { MocksController } from "../../src/controllers/Mocks.controller";

export default (request: VercelRequest, response: VercelResponse) =>
  new MocksController(request, response);
