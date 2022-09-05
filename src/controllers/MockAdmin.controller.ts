import { MockService } from "../services/Mock.service";
import { Auth0Service } from "../services/Auth0.service";

import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { CreateMock, HttpMethod } from "../types";

export class MockAdminController {
  request: VercelRequest;
  response: VercelResponse;

  mockService = new MockService();
  auth0Service = new Auth0Service();

  id: string;

  constructor(request: VercelRequest, response: VercelResponse) {
    this.request = request;
    this.response = response;
    this.id = request.query.id as string;

    this.init();
  }

  async updateMock() {
    try {
      const body = this.request.body as Partial<CreateMock>;
      const headers = this.request.headers;

      if (!body) throw new Error();
      if (!headers.authorization) {
        this.response.status(401).send("Unauthorized");
        return;
      }

      const mock = await this.mockService.getMock(this.id);

      try {
        const user = await this.auth0Service.getUserByAccessToken(
          headers.authorization
        );
        if (mock.creatorId !== user.sub) throw new Error();
      } catch (error) {
        this.response.status(401).send("Unauthorized");
        return;
      }

      const updatedMock = await this.mockService.updateMock(this.id, body);

      this.response.status(200).send(updatedMock.response);
    } catch (error) {
      this.response.status(500).send("Internal Server Error");
    }
  }

  async deleteMock() {
    try {
      const headers = this.request.headers;

      if (!headers.authorization) {
        this.response.status(401).send("Unauthorized");
        return;
      }

      const mock = await this.mockService.getMock(this.id);

      try {
        const user = await this.auth0Service.getUserByAccessToken(
          headers.authorization
        );
        if (mock.creatorId !== user.sub) throw new Error();
      } catch (error) {
        this.response.status(401).send("Unauthorized");
        return;
      }

      await this.mockService.deleteMock(this.id);

      this.response.status(200).send("");
    } catch (error) {
      this.response.status(500).send("Internal Server Error");
    }
  }

  init() {
    const method = this.request.method as HttpMethod;

    switch (method) {
      case "PUT":
        this.updateMock();
        break;
      case "DELETE":
        this.deleteMock();
        break;
      default:
        this.response.status(405).send("Method Not Allowed");
    }
  }
}
