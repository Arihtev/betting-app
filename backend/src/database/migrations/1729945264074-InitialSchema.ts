import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initialschema1729945264074 implements MigrationInterface {
  name = 'Initialschema1729945264074';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "events" ("id" SERIAL NOT NULL, "type" character varying(255) NOT NULL, "team_a" character varying(255) NOT NULL, "team_b" character varying(255) NOT NULL, "odds_team_a" numeric(6,2) NOT NULL, "odds_team_b" numeric(6,2) NOT NULL, "odds_draw" numeric(6,2) NOT NULL, "date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bets" ("id" SERIAL NOT NULL, "stake" numeric(10,2) NOT NULL, "user_id" integer NOT NULL, "event_id" integer NOT NULL, "selection" "public"."bets_selection_enum" NOT NULL, "odds" numeric(6,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_7ca91a6a39623bd5c21722bcedd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `,
    );
    await queryRunner.query(
      `ALTER TABLE "bets" ADD CONSTRAINT "FK_8e3c745e288eea6d3c9475550e2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bets" ADD CONSTRAINT "FK_c899ce0e51fc1cb703692ad8a1c" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bets" DROP CONSTRAINT "FK_c899ce0e51fc1cb703692ad8a1c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bets" DROP CONSTRAINT "FK_8e3c745e288eea6d3c9475550e2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fe0bb3f6520ee0469504521e71"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "bets"`);
    await queryRunner.query(`DROP TABLE "events"`);
  }
}
