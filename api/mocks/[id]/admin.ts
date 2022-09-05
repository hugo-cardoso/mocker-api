import type { VercelRequest, VercelResponse } from "@vercel/node";
import { MockAdminController } from "../../../src/controllers/MockAdmin.controller";

export default (request: VercelRequest, response: VercelResponse) =>
  new MockAdminController(request, response);
