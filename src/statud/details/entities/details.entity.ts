import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Statud } from '../../entities/statud.entity';

@Entity()
export class details {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    statudId: number;

    @Column('int')
    type: number;

    @Column({ length: 50, nullable: false })
    descripcion: string;

    @Column('decimal')
    value: number;

    @Column('int')
    status: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @ManyToOne(() => Statud, (statud) => statud.details)
    statud: Statud;
}