import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('user')
export class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  nome: string;

  @Column("varchar")
  sobrenome: string;

  @Column("varchar", {unique: true})
  email: string;

  @Column("varchar", {unique: true})
  telefone: string;

  @Column("varchar")
  senha: string;
 
  @CreateDateColumn({type: "timestamp", name: "created_at"})
  createdAt: Date;
  
  @CreateDateColumn({type: "timestamp", name: "updated_at"})
  updatedAt: Date;

}