import * as dotenv from "dotenv";
import { connect, Mongoose } from "mongoose";

dotenv.config();

export class DatabaseService {
  private uri: string = process.env.MONGODB_URL;

  async connect(): Promise<Mongoose> {
    try {
      const connection = await connect(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });

      return connection;
    } catch (error) {
      console.log(error);
    }
  }
}
