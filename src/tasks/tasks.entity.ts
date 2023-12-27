import {
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  OneToMany,
  Column,
} from 'typeorm';

import { Project, User } from 'src/entities';

export enum TaskType {
  None = 'none',
  Bug = 'bug',
  Feature = 'feature',
}

export enum TaskPriority {
  None = 'none',
  Low = 'low',
  Intermediate = 'intermediate',
  Critical = 'critical',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  title: string;

  @Column('text')
  description: string;

  @Column('int')
  createdBy: number;

  @Column('int')
  assignedBy: number;

  @Column({ default: TaskType.None })
  type: TaskType;

  @Column({ default: TaskPriority.None })
  priority: TaskPriority;

  @Column('date')
  dueDate: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  assignee: User;

  @OneToMany(() => Project, (project) => project.tasks)
  project: Project;
}
