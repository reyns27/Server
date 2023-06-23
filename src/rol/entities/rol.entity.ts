import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 9, nullable: false })
  Code: string;

  @Column({ length: 50, nullable: false })
  Description: string;

  @Column('int')
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToMany(() => User, (user) => user.rol)
  users: User[];
}
