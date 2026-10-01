import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Institution } from './institution.entity';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(Institution)
    private institutionsRepository: Repository<Institution>,
  ) {}

  async create(createInstitutionDto: CreateInstitutionDto): Promise<Institution> {
    // Check if institution with this code already exists
    const existingInstitution = await this.institutionsRepository.findOne({
      where: { code: createInstitutionDto.code },
    });
    if (existingInstitution) {
      throw new ConflictException('Institution with this code already exists');
    }

    // Create and save institution
    const institution = this.institutionsRepository.create(createInstitutionDto);
    return this.institutionsRepository.save(institution);
  }

  async findAll(): Promise<Institution[]> {
    return this.institutionsRepository.find();
  }

  async findOne(id: string): Promise<Institution> {
    const institution = await this.institutionsRepository.findOne({
      where: { id },
    });
    if (!institution) {
      throw new NotFoundException(`Institution with ID ${id} not found`);
    }
    return institution;
  }

  async findByCode(code: string): Promise<Institution> {
    const institution = await this.institutionsRepository.findOne({
      where: { code },
    });
    if (!institution) {
      throw new NotFoundException(`Institution with code ${code} not found`);
    }
    return institution;
  }

  async update(id: string, updateInstitutionDto: UpdateInstitutionDto): Promise<Institution> {
    await this.findOne(id); // This will throw NotFoundException if not found

    // Update the institution
    await this.institutionsRepository.update(id, updateInstitutionDto);

    // Return the updated institution
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.institutionsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Institution with ID ${id} not found`);
    }
  }
}