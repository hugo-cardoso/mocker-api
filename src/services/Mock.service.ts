import { MockRepository } from "../repositories/Mock.repository";
import type { Mock, CreateMock } from "../types";

export class MockService {
  mockRepository = new MockRepository();

  getMock(id: Mock["_id"]): Promise<Mock> {
    return this.mockRepository.findById(id);
  }

  updateMock(id: Mock["_id"], mock: Partial<CreateMock>): Promise<Mock> {
    return this.mockRepository.updateById(id, mock);
  }

  deleteMock(id: Mock["_id"]) {
    return this.mockRepository.deleteById(id);
  }
}
