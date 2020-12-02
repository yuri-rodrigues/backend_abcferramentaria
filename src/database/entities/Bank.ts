import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import Agencie from './Agencie';

@Entity('banks')
class Bank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @OneToMany(() => Agencie, agencie => agencie.id)
  @JoinColumn()
  agencie: Agencie[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Bank;
