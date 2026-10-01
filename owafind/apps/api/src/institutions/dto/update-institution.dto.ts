import { IsOptional, IsString } from 'class-validator';

export class UpdateInstitutionDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  isActive?: string; // Keeping as string for simplicity, could be boolean

  @IsOptional()
  settings?: Record<string, any>;
}