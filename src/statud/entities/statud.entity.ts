import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { details } from '../details/entities/details.entity';

@Entity()
export class Statud {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, nullable: false })
    description: string;

    @Column()
    userId: number;

    @Column('decimal')
    expenses: number;

    @Column('decimal')
    income: number;

    @Column('decimal')
    balance: number;

    @Column('int')
    status: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToMany(() => details, (details) => details.statud)
    details: details[];
}
