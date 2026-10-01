import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Institution } from './institution.entity';
import { User } from '../users/user.entity';

@Entity()
export class InstitutionUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Institution, (institution) => institution.institutionUsers)
  institution: Institution;

  @ManyToOne(() => User, (user) => user.institutionUsers)
  user: User;

  @Column()
  role: string; // e.g., 'admin', 'staff', 'viewer'

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  expiresAt: Date;
}