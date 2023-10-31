import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from 'typeorm';
export class Message {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column()
    text:string;
    @Column({ length: 255, nullable: true })
    imageUrl: string;
    @Column({ length: 255, nullable: true })
    videoUrl: string;
    @Column()
    fromWho: string;
    @Column()
    forWho: string;
    @Column()
    sendDate: Date;

}
