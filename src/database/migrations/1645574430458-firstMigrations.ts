import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigrations1645574430458 implements MigrationInterface {
    name = 'firstMigrations1645574430458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Artists" ("id" SERIAL NOT NULL, "fullname" character varying(25) NOT NULL, "status" boolean NOT NULL DEFAULT true, "born" date NOT NULL, "gender" character varying NOT NULL, CONSTRAINT "PK_50c85272913bb9a20198e25616e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Albums" ("id" SERIAL NOT NULL, "url" character varying(25) NOT NULL, "status" boolean NOT NULL DEFAULT true, "artist_id" integer, CONSTRAINT "PK_402c872b4d95f3710804d162a53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Bands" ("id" SERIAL NOT NULL, "fullname" character varying(25) NOT NULL, "status" boolean NOT NULL DEFAULT true, "born" date NOT NULL, "gender" character varying NOT NULL, CONSTRAINT "PK_8556518a473c564ae589f91ec44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Songs" ("id" SERIAL NOT NULL, "url" character varying(25) NOT NULL, "release_date" TIMESTAMP NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_At" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_1dfdb20e61091a01eab9a067a86" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_details" ("id" SERIAL NOT NULL, "name" character varying(50), "lastname" character varying, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(25) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_At" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "detail_id" integer NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "REL_9fc134ca20766e165ad650ee74" UNIQUE ("detail_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Albums" ADD CONSTRAINT "FK_f8e47f02d2947559b5dd27e372f" FOREIGN KEY ("artist_id") REFERENCES "Artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_9fc134ca20766e165ad650ee740" FOREIGN KEY ("detail_id") REFERENCES "user_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_9fc134ca20766e165ad650ee740"`);
        await queryRunner.query(`ALTER TABLE "Albums" DROP CONSTRAINT "FK_f8e47f02d2947559b5dd27e372f"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_details"`);
        await queryRunner.query(`DROP TABLE "Songs"`);
        await queryRunner.query(`DROP TABLE "Bands"`);
        await queryRunner.query(`DROP TABLE "Albums"`);
        await queryRunner.query(`DROP TABLE "Artists"`);
    }

}
