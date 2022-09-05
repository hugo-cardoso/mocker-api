import * as dotenv from "dotenv";
import axios from "axios";
import { Auth0User } from "../types";

dotenv.config();

export class Auth0Service {
  private domain: string = process.env.AUTH0_DOMAIN;
  private $http = axios.create({
    baseURL: `https://${this.domain}`,
  });

  async getUserByAccessToken(accessToken: string): Promise<Auth0User> {
    try {
      const response = await this.$http.get("/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
