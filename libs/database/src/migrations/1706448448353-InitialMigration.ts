import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1706448448353 implements MigrationInterface {
    name = 'InitialMigration1706448448353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "date" datetime NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "date" datetime NOT NULL, "userId" integer, CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_post"("id", "title", "content", "date", "userId") SELECT "id", "title", "content", "date", "userId" FROM "post"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "date" datetime NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "post"("id", "title", "content", "date", "userId") SELECT "id", "title", "content", "date", "userId" FROM "temporary_post"`);
        await queryRunner.query(`DROP TABLE "temporary_post"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
