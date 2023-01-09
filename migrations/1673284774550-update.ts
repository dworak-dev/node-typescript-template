import { MigrationInterface, QueryRunner } from "typeorm";

export class update1673284774550 implements MigrationInterface {
    name = 'update1673284774550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "age" integer NOT NULL, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
