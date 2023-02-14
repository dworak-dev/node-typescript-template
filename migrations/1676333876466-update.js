const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class update1676333876466 {
    name = 'update1676333876466'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "age" integer NOT NULL, "phone" text, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "User"`);
    }
}
