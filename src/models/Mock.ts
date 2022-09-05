import { Schema, model } from "mongoose";

import type { Mock } from "../types";

export const MockSchema = new Schema<Mock>({
  name: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  statusCode: {
    type: Number,
    required: true,
  },
  response: {
    type: Schema.Types.Mixed,
    required: true,
  },
  creatorId: {
    type: String,
    required: true,
  }
});

export default model<Mock>("Mock", MockSchema);