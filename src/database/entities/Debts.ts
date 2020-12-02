import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import BankAccount from './BankAccount';
import AccountGroup from './AccountGroup';
import Supplier from './Supplier';

@Entity('debts')
class Debts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: number;

  @Column()
  juros: number;

  @Column()
  parcela: number;

  @Column()
  data_emissao: Date;

  @Column()
  data_vencimento: Date;

  @Column()
  data_quitacao: Date;

  @Column()
  status: 'aberta' | 'paga' | 'vencida';

  @OneToOne(() => AccountGroup)
  @JoinColumn({ name: 'account_group_id' })
  account_group_id: AccountGroup;

  @ManyToOne(() => Supplier, supplier => supplier)
  @JoinColumn({ name: 'supplier_id' })
  supplier_id: Supplier;

  @OneToOne(() => BankAccount)
  @JoinColumn({ name: 'bank_account_id' })
  bank_account_id: BankAccount;

  @Column()
  obs: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Debts;
