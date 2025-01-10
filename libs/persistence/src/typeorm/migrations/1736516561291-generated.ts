import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1736516561291 implements MigrationInterface {
    name = 'Generated1736516561291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payment_log_payment_status_enum" AS ENUM('PENDING', 'INITIATED', 'COMPLETED_SUCCESSFULLY', 'FAILED')`);
        await queryRunner.query(`CREATE TABLE "payment_log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "payment_id" uuid, "payment_request" jsonb, "payment_response" jsonb, "payment_status" "public"."payment_log_payment_status_enum" NOT NULL DEFAULT 'PENDING', "create_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modify_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "amount" bigint DEFAULT '0', CONSTRAINT "PK_1b679dd9b2a5aec836097f7e6d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."payment_payment_status_enum" AS ENUM('INITIALIZED', 'IN_PROGRESS', 'COMPLETED', 'FAILED_PAYMENT', 'FAILED_CHECKOUT')`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "external_id" character varying(60), "amount" bigint DEFAULT '0', "payment_status" "public"."payment_payment_status_enum" NOT NULL DEFAULT 'INITIALIZED', "payment_request" jsonb, "create_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modify_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment_log" ADD CONSTRAINT "FK_d8740a634919766120cd0782671" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_log" DROP CONSTRAINT "FK_d8740a634919766120cd0782671"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TYPE "public"."payment_payment_status_enum"`);
        await queryRunner.query(`DROP TABLE "payment_log"`);
        await queryRunner.query(`DROP TYPE "public"."payment_log_payment_status_enum"`);
    }

}
