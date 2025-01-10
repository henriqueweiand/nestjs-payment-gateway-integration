import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1732834061686 implements MigrationInterface {
    name = 'Generated1732834061686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."federated_identity_type_enum" AS ENUM('GITHUB', 'GOOGLE')`);
        await queryRunner.query(`CREATE TABLE "federated_identity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "external_id" character varying NOT NULL, "type" "public"."federated_identity_type_enum" NOT NULL, "data" json NOT NULL, "create_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modify_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_be34b3846fcf7528596cc388643" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "create_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modify_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "federated_identity" ADD CONSTRAINT "FK_665d30ddec9f7736fabcbd789ae" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "federated_identity" DROP CONSTRAINT "FK_665d30ddec9f7736fabcbd789ae"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "federated_identity"`);
        await queryRunner.query(`DROP TYPE "public"."federated_identity_type_enum"`);
    }

}
