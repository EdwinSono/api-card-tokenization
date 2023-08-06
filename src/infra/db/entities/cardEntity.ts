
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({name: 'cards'})
export class Card {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'varchar', length: 100})
  email: string

  @Column({type: 'varchar', length: 50, unique: true})
  card_number: string

  @Column({type: 'varchar', length: 10})
  cvv: string

  @Column({type: 'varchar', length: 10})
  expiration_year: string

  @Column({type: 'varchar', length: 10})
  expiration_month: string

  @Column({type: 'varchar', length: 100, unique: true})
  token: string

  @Column({type: 'varchar', length: 50})
  status: string

  @CreateDateColumn()
  createdDate: Date;
  
  @UpdateDateColumn()
  updatedDate: Date;

}
