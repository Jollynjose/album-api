import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigrations1645574728064 implements MigrationInterface {
    name = 'firstMigrations1645574728064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "description" text NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
