import { Test, TestingModule } from '@nestjs/testing';
import { InstitutionsService } from '../../src/institutions/institutions.service';
import { Institution } from '../../src/institutions/institution.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('InstitutionsService', () => {
  let service: InstitutionsService;
  let repository: Repository<Institution>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstitutionsService,
        {
          provide: getRepositoryToken(Institution),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<InstitutionsService>(InstitutionsService);
    repository = module.get<Repository<Institution>>(getRepositoryToken(Institution));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an institution', async () => {
      const createInstitutionDto = {
        name: 'Test Institution',
        code: 'TEST001',
        description: 'A test institution',
      };

      // Mock the repository methods
      repository.findOne.mockResolvedValue(undefined); // No existing institution with this code
      repository.create.mockImplementation((dto) => {
        const institution = new Institution();
        Object.assign(institution, dto);
        return institution;
      });
      repository.save.mockImplementation((institution) => {
        institution.id = '1';
        return Promise.resolve(institution);
      });

      const result = await service.create(createInstitutionDto);
      expect(result).toBeDefined();
      expect(result.id).toBe('1');
      expect(result.name).toBe(createInstitutionDto.name);
      expect(result.code).toBe(createInstitutionDto.code);
      expect(result.description).toBe(createInstitutionDto.description);
    });

    it('should throw ConflictException if institution with code already exists', async () => {
      const createInstitutionDto = {
        name: 'Test Institution',
        code: 'TEST001',
        description: 'A test institution',
      };

      // Mock the repository methods
      repository.findOne.mockResolvedValue({
        id: '1',
        ...createInstitutionDto,
      }); // Existing institution with this code

      await expect(service.create(createInstitutionDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});