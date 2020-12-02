import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Agencie from './Agencie';

@Entity('bank_accounts')
class BankAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  num_account: number;

  @Column()
  balance: number;

  @ManyToOne(() => Agencie, agencie => agencie.id)
  @JoinColumn({ name: 'agencie_id' })
  agencie_id: Agencie;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default BankAccount;
