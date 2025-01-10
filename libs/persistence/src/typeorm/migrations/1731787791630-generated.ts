import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1731787791630 implements MigrationInterface {
    name = 'Generated1731787791630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."country_provider_enum" AS ENUM('AVIATION_STACK')`);
        await queryRunner.query(`CREATE TABLE "country" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "capital" character varying(255), "currency_code" character varying(12), "continent" character varying(32) NOT NULL, "country_name" character varying(255) NOT NULL, "currency_name" character varying(255), "phone_prefix" character varying(32), "external_id" character varying(12) NOT NULL, "country_iso2" character varying(12) NOT NULL, "country_iso3" character varying(12) NOT NULL, "provider" "public"."country_provider_enum" NOT NULL, "create_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modify_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."arrival_provider_enum" AS ENUM('AVIATION_STACK')`);
        await queryRunner.query(`CREATE TABLE "arrival" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "iata" character varying(32), "icao" character varying(32), "terminal" character varying(32), "gate" character varying(32), "delay" character varying(32), "baggage" character varying(32), "scheduled" TIMESTAMP, "estimated" TIMESTAMP, "actual" TIMESTAMP, "estimated_runway" TIMESTAMP, "actual_runway" TIMESTAMP, "airport_name" character varying(255), "provider" "public"."arrival_provider_enum" NOT NULL, "create_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modify_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "airportId" uuid, CONSTRAINT "PK_10dd23dd7b6590577c1d90c2228" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."airport_provider_enum" AS ENUM('AVIATION_STACK')`);
        await queryRunner.query(`CREATE TABLE "airport" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "airport_name" character varying(255), "iata_code" character varying(32) NOT NULL, "icao_code" character varying(32) NOT NULL, "latitude" character varying(32), "longitude" character varying(32) NOT NULL, "timezone" character varying(32), "gmt" character varying(12), "phone_number" character varying(32), "external_id" character varying(12) NOT NULL, "country_name" character varying(255), "provider" "public"."airport_provider_enum" NOT NULL, "create_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modify_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "country_id" uuid, CONSTRAINT "PK_ea1ecba8dec9bee0cb60194e788" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."departure_provider_enum" AS ENUM('AVIATION_STACK')`);
        await queryRunner.query(`CREATE TABLE "departure" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "iata" character varying(32), "icao" character varying(32), "terminal" character varying(32), "gate" character varying(32), "delay" character varying(32), "baggage" character varying(32), "scheduled" TIMESTAMP, "estimated" TIMESTAMP, "actual" TIMESTAMP, "estimated_runway" TIMESTAMP, "actual_runway" TIMESTAMP, "airport_name" character varying(255), "provider" "public"."departure_provider_enum" NOT NULL, "create_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modify_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "airportId" uuid, CONSTRAINT "PK_bebd835e644b3ce800efcf392f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."flight_provider_enum" AS ENUM('AVIATION_STACK')`);
        await queryRunner.query(`CREATE TABLE "flight" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "status" character varying(32) NOT NULL, "number" character varying(32) NOT NULL, "iata" character varying(32) NOT NULL, "icao" character varying(32) NOT NULL, "provider" "public"."flight_provider_enum" NOT NULL, "airline" json, "aircraft" json, "external_id" character varying(12), "create_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "modify_dtm" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "departure_id" uuid, "arrival_id" uuid, CONSTRAINT "REL_d9a2a2bc78ef4846609a3eeecb" UNIQUE ("departure_id"), CONSTRAINT "REL_212b6016868b51e4f8ea92875c" UNIQUE ("arrival_id"), CONSTRAINT "PK_bf571ce6731cf071fc51b94df03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "arrival" ADD CONSTRAINT "FK_8995f493e78c76c90c27774eba8" FOREIGN KEY ("airportId") REFERENCES "airport"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "airport" ADD CONSTRAINT "FK_697d2a8ca61b28cc24a16e66bcb" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "departure" ADD CONSTRAINT "FK_1a61c51004993364ffd2d919ab2" FOREIGN KEY ("airportId") REFERENCES "airport"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flight" ADD CONSTRAINT "FK_d9a2a2bc78ef4846609a3eeecb2" FOREIGN KEY ("departure_id") REFERENCES "departure"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "flight" ADD CONSTRAINT "FK_212b6016868b51e4f8ea92875ce" FOREIGN KEY ("arrival_id") REFERENCES "arrival"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flight" DROP CONSTRAINT "FK_212b6016868b51e4f8ea92875ce"`);
        await queryRunner.query(`ALTER TABLE "flight" DROP CONSTRAINT "FK_d9a2a2bc78ef4846609a3eeecb2"`);
        await queryRunner.query(`ALTER TABLE "departure" DROP CONSTRAINT "FK_1a61c51004993364ffd2d919ab2"`);
        await queryRunner.query(`ALTER TABLE "airport" DROP CONSTRAINT "FK_697d2a8ca61b28cc24a16e66bcb"`);
        await queryRunner.query(`ALTER TABLE "arrival" DROP CONSTRAINT "FK_8995f493e78c76c90c27774eba8"`);
        await queryRunner.query(`DROP TABLE "flight"`);
        await queryRunner.query(`DROP TYPE "public"."flight_provider_enum"`);
        await queryRunner.query(`DROP TABLE "departure"`);
        await queryRunner.query(`DROP TYPE "public"."departure_provider_enum"`);
        await queryRunner.query(`DROP TABLE "airport"`);
        await queryRunner.query(`DROP TYPE "public"."airport_provider_enum"`);
        await queryRunner.query(`DROP TABLE "arrival"`);
        await queryRunner.query(`DROP TYPE "public"."arrival_provider_enum"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`DROP TYPE "public"."country_provider_enum"`);
    }

}
