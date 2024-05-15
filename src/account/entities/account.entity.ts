import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'accounts'})

export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    accountNumber: string;

    @Column()
    balance: number;
}
