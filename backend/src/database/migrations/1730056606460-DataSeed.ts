import { MigrationInterface, QueryRunner } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import * as bcrypt from 'bcrypt';

export class DataSeed1730056606460 implements MigrationInterface {
  name = 'DataSeed1730056606460';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = [
      { username: 'bob', password: 'bob' },
      { username: 'john', password: 'john' },
      { username: 'susan', password: 'susan' },
    ];

    for (const user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    await queryRunner.query(
      `INSERT INTO users (username, password) VALUES 
        ${users.map((user) => `('${user.username}', '${user.password}')`).join(', ')}`,
    );

    const events: Partial<Event>[] = [
      {
        type: 'Soccer',
        teamA: 'Manchester United',
        teamB: 'Liverpool',
        oddsTeamA: 2.5,
        oddsTeamB: 2.8,
        oddsDraw: 3.1,
        date: new Date('2024-11-25T18:30:00Z'),
      },
      {
        type: 'Soccer',
        teamA: 'Real Madrid',
        teamB: 'Barcelona',
        oddsTeamA: 2.7,
        oddsTeamB: 2.6,
        oddsDraw: 3.2,
        date: new Date('2024-11-25T20:00:00Z'),
      },
      {
        type: 'Soccer',
        teamA: 'Paris Saint-Germain',
        teamB: 'Bayern Munich',
        oddsTeamA: 2.9,
        oddsTeamB: 2.5,
        oddsDraw: 3.3,
        date: new Date('2024-11-25T19:45:00Z'),
      },
      {
        type: 'Basketball',
        teamA: 'Los Angeles Lakers',
        teamB: 'Boston Celtics',
        oddsTeamA: 1.8,
        oddsTeamB: 2.0,
        oddsDraw: 15.0,
        date: new Date('2024-11-25T02:00:00Z'),
      },
      {
        type: 'Basketball',
        teamA: 'Chicago Bulls',
        teamB: 'Golden State Warriors',
        oddsTeamA: 2.3,
        oddsTeamB: 1.9,
        oddsDraw: 15.0,
        date: new Date('2024-11-25T03:00:00Z'),
      },
      {
        type: 'Basketball',
        teamA: 'Miami Heat',
        teamB: 'New York Knicks',
        oddsTeamA: 2.1,
        oddsTeamB: 2.2,
        oddsDraw: 15.0,
        date: new Date('2024-11-25T02:30:00Z'),
      },
    ];

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Event)
      .values(events)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM users WHERE username IN ('bob', 'john', 'susan')`,
    );
    await queryRunner.query(`DELETE FROM events`);
  }
}
