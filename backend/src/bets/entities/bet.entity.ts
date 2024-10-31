import { User } from '../../users/entities/user.entity';
import { Event } from '../../events/entities/event.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SelectionEnum } from '../../utils/types';

@Entity('bets')
export class Bet {
  constructor(init?: Partial<Bet>) {
    Object.assign(this, init);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  stake: number;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @ManyToOne(() => User, (user) => user.bets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'event_id', type: 'int' })
  eventId: number;

  @ManyToOne(() => Event, (event) => event.bets)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column({
    type: 'enum',
    enum: [SelectionEnum.TeamA, SelectionEnum.TeamB, SelectionEnum.Draw],
    name: 'selection',
  })
  selection: SelectionEnum;

  @Column('decimal', { precision: 6, scale: 2 })
  odds: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
