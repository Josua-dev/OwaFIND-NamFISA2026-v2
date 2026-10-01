import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionsService } from './institutions.service';
import { InstitutionsController } from './institutions.controller';
import { Institution } from './institution.entity';
import { InstitutionUser } from './institution-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Institution, InstitutionUser])],
  controllers: [InstitutionsController],
  providers: [InstitutionsService],
})
export class InstitutionsModule {}