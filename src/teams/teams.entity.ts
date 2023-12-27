import { Project } from 'src/projects/projects.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  Column,
} from 'typeorm';

export enum TeamType {
  Backend = 'backend',
  Frontend = 'frontend',
  Testing = 'testing',
  DevOps = 'devOps',
}

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: TeamType;

  @ManyToMany(() => User, (user) => user.teams)
  @JoinTable()
  members: User[];

  @ManyToMany(() => Project, (project) => project.teams)
  projects: Project[];
}
