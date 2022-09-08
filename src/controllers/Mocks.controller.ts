import { MocksService } from "../services/Mocks.service";
import { Auth0Service } from "../services/Auth0.service";

import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { HttpMethod, CreateMock } from "../types";

export class MocksController {
  request: VercelRequest;
  response: VercelResponse;

  mocksService = new MocksService();
  auth0Service = new Auth0Service();

  constructor(request: VercelRequest, response: VercelResponse) {
    this.request = request;
    this.response = response;

    this.init();
  }

  async getAll() {
    try {
      const headers = this.request.headers;

      if (!headers.authorization) {
        this.response.status(401).send("Unauthorized");
        return;
      }

      const user = await this.auth0Service.getUserByAccessToken(headers.authorization);
      const mocks = await this.mocksService.getMocks(user.sub);

      this.response.status(200).send(mocks);
    } catch (error) {
      this.response.status(500).send(error);
    }
  }

  async create() {
    try {
      const body = this.request.body as CreateMock;
      const headers = this.request.headers;

      if (!body) throw new Error();
      if (!headers.authorization) {
        this.response.status(401).send("Unauthorized");
        return;
      }

      const user = await this.auth0Service.getUserByAccessToken(headers.authorization);
      const mock = await this.mocksService.createMock({
        ...body,
        creatorId: user.sub,
      });

      this.response.status(200).send({
        id: mock._id,
        response: mock.response,
      });
    } catch (error) {
      console.log(error);
      this.response.status(400).send("Bad Request");
    }
  }

  init() {
    const method = this.request.method as HttpMethod;

    switch (method) {
      case "GET":
        this.getAll();
        break;
      case "POST":
        this.create();
        break;
      case "OPTIONS":
        this.response.status(200).end();
        break;
      default:
        this.response.status(405).send("Method Not Allowed");
    }
  }
}
