import { Bet } from '../../bets/entities/bet.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('events')
export class Event {
  constructor(init?: Partial<Event>) {
    Object.assign(this, init);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  type: string;

  @Column('varchar', { length: 255 })
  teamA: string;

  @Column('varchar', { length: 255 })
  teamB: string;

  @Column('decimal', { name: 'odds_team_a', precision: 6, scale: 2 })
  oddsTeamA: number;

  @Column('decimal', { name: 'odds_team_b', precision: 6, scale: 2 })
  oddsTeamB: number;

  @Column('decimal', { name: 'odds_draw', precision: 6, scale: 2 })
  oddsDraw: number;

  @Column('timestamp')
  date: Date;

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

  @OneToMany(() => Bet, (bet) => bet.user)
  bets: Bet[];
}
