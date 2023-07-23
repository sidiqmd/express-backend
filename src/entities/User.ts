import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    createdAt: Date;

    @Column({
        nullable: true,
    })
    updatedAt: Date;

    @Column({
        nullable: true,
    })
    lastLoginAt: Date;
}
