import { MockRepository } from "../repositories/Mock.repository";
import type { CreateMock, Mock } from "../types";

export class MocksService {
  mockRepository = new MockRepository();

  getMocks(creatorId: Mock['creatorId']): Promise<Mock[]> {
     return this.mockRepository.findByCreatorId(creatorId);
  }

  createMock(mock: CreateMock): Promise<Mock> {
    return this.mockRepository.create(mock);
  }
}