import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Task, Team, User } from '@/entities';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => User, (user) => user.managedProjects)
  manager: User;

  @ManyToOne(() => Task, (task) => task.project)
  tasks: Task[];

  @ManyToMany(() => Team, (team) => team.projects)
  teams: Team[];

  @ManyToMany(() => User, (user) => user.projects)
  members: User[];
}
