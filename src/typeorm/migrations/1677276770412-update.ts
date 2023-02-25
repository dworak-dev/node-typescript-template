import { MigrationInterface, QueryRunner } from "typeorm";

export class update1677276770412 implements MigrationInterface {
    name = 'update1677276770412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "googleEmail" text NOT NULL, "googleId" text NOT NULL, "googleAccessToken" text, CONSTRAINT "UQ_57ecefbce2a5323ada1b359cee0" UNIQUE ("googleEmail"), CONSTRAINT "UQ_02dec29f4ca814ab6efa2d4f0c4" UNIQUE ("googleId"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "OAuthState" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cbURL" text, CONSTRAINT "PK_b84243eaf84f172a160d0f4c7ce" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "OAuthState"`);
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
