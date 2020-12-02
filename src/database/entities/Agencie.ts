import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Bank from './Bank';

import BankAccount from './BankAccount';

// Classe com decorator pra 'firmar' o contrato entre o repository e o banco
@Entity('agencies')
class Agencie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  num_agencia: string;

  @Column()
  gerente: string;

  @Column()
  telefone1: string;

  @Column()
  telefone2: string;

  @Column()
  email: string;

  @OneToMany(() => BankAccount, bank_account => bank_account.id)
  bank_account: BankAccount[];

  @ManyToOne(() => Bank, bank => bank.agencie)
  @JoinColumn({ name: 'bank_id' })
  bank_id: Bank;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Agencie;
