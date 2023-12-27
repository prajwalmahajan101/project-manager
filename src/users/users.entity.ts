import { Project } from 'src/projects/projects.entity';
import { Task } from 'src/tasks/tasks.entity';
import { Team } from 'src/teams/teams.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  managingProjects: Project[];

  @ManyToMany(() => Team, (team) => team.members)
  teams: Team[];

  @OneToMany(() => Task, (task) => task.assignee)
  tasks: Task[];

  @ManyToMany(() => Project, (project) => project.members)
  @JoinTable()
  projects: Project[];
}
