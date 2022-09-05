import { MockRepository } from "../repositories/Mock.repository";
import type { CreateMock, Mock } from "../types";

export class MocksService {
  mockRepository = new MockRepository();

  getMocks(): Promise<Mock[]> {
     return this.mockRepository.find();
  }

  createMock(mock: CreateMock): Promise<Mock> {
    return this.mockRepository.create(mock);
  }
}