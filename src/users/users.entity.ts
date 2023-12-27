import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Project, Task, Team } from 'src/entities';

export enum UserRole {
  SuperAdmin = 'super-admin',
  ProjectManager = 'project-manager',
  TeamManager = 'team-manager',
  TeamMember = 'team-member',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: null })
  designation: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: UserRole.TeamMember })
  role: UserRole;

  @OneToMany(() => Project, (project) => project.manager)
  managedProjects: Project[];

  @OneToMany(() => Team, (team) => team.manager)
  managedTeams: Team[];

  @ManyToMany(() => Team, (team) => team.members)
  teams: Team[];

  @OneToMany(() => Task, (task) => task.assignee)
  tasks: Task[];

  @ManyToMany(() => Project, (project) => project.members)
  @JoinTable()
  projects: Project[];
}
