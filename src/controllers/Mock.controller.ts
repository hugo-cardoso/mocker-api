import { MockService } from "../services/Mock.service";

import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { HttpMethod } from "../types";

export class MockController {
  request: VercelRequest;
  response: VercelResponse;

  mockService = new MockService();

  id: string;

  constructor(request: VercelRequest, response: VercelResponse) {
    this.request = request;
    this.response = response;
    this.id = request.query.id as string;

    this.handlerMock();
  }

  async handlerMock() {
    try {
      const mock = await this.mockService.getMock(this.id);

      if (!mock) {
        this.response.status(404).send("Not Found");
        return;
      }

      if (mock.method !== (this.request.method as HttpMethod))
        throw new Error();

      this.response.status(mock.statusCode).send(mock.response);
    } catch (error) {
      this.response.status(500).send("Internal Server Error");
    }
  }
}
