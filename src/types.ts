export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS";

export type Mock = {
  _id: string;
  name: string;
  method: HttpMethod;
  statusCode: number;
  response: any;
  creatorId: string;
};

export type CreateMock = Pick<Mock, "name" | "method" | "response"> & {
  creatorId?: string;
};

export type ResponseMock = CreateMock["response"];

export type Auth0User = {
  sub: string;
  email: string;
};
