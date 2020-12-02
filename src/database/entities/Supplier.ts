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

import Debts from './Debts';
import SuppllierContact from './SupplierContact';

@Entity('suppliers')
class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cnpj: string;

  @Column()
  razaosocial: string;

  @Column()
  nome_fantasia: string;

  @Column()
  inscr_estadual: string;

  @Column()
  nome: string;

  @Column()
  obs: string;

  @OneToOne(() => SuppllierContact)
  @JoinColumn({ name: 'contact' })
  contact: SuppllierContact;

  @ManyToOne(() => Debts, debts => debts.supplier_id)
  @JoinColumn({ name: 'debt_id' })
  debt_id: Debts;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Supplier;
