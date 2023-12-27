import { Task } from 'src/tasks/tasks.entity';
import { Team } from 'src/teams/teams.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => User, (user) => user.managingProjects)
  manager: User;

  @ManyToOne(() => Task, (task) => task.project)
  tasks: Task[];

  @ManyToMany(() => Team, (team) => team.projects)
  teams: Team[];

  @ManyToMany(() => User, (user) => user.projects)
  members: User[];
}
