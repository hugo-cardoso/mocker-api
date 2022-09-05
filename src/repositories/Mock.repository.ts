import MockModel from "../models/Mock";
import { DatabaseService } from "../services/Database.service";

import type { Mock, CreateMock } from "../types";

export class MockRepository {
  databaseService = new DatabaseService();

  constructor() {
    this.databaseService.connect();
  }

  async find(): Promise<Mock[]> {
    return await MockModel.find();
  }

  async findById(id: Mock["_id"]): Promise<Mock> {
    return await MockModel.findById(id);
  }

  async create(mock: CreateMock): Promise<Mock> {
    return await MockModel.create(mock);
  }

  async updateById(id: Mock["_id"], mock: Partial<CreateMock>): Promise<Mock> {
    return await MockModel.findByIdAndUpdate(id, mock);
  }

  async deleteById(id: Mock["_id"]) {
    return await MockModel.findByIdAndDelete(id);
  }
}
