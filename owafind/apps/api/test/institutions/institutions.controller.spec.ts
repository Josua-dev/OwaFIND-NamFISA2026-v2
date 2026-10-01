import { Test, TestingModule } from '@nestjs/testing';
import { InstitutionsController } from '../../src/institutions/institutions.controller';
import { InstitutionsService } from '../../src/institutions/institutions.service';

describe('InstitutionsController', () => {
  let controller: InstitutionsController;
  let service: InstitutionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstitutionsController],
      providers: [
        {
          provide: InstitutionsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findByCode: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<InstitutionsController>(InstitutionsController);
    service = module.get<InstitutionsService>(InstitutionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create', async () => {
      const createInstitutionDto = {
        name: 'Test Institution',
        code: 'TEST001',
        description: 'A test institution',
      };
      await controller.create(createInstitutionDto);
      expect(service.create).toHaveBeenCalledWith(createInstitutionDto);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call service.findOne', async () => {
      await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('findByCode', () => {
    it('should call service.findByCode', async () => {
      await controller.findByCode('TEST001');
      expect(service.findByCode).toHaveBeenCalledWith('TEST001');
    });
  });

  describe('update', () => {
    it('should call service.update', async () => {
      const updateDto = { name: 'Updated Name' };
      await controller.update('1', updateDto);
      expect(service.update).toHaveBeenCalledWith('1', updateDto);
    });
  });

  describe('remove', () => {
    it('should call service.remove', async () => {
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});