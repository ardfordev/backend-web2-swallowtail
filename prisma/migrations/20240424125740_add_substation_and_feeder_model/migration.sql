-- CreateTable
CREATE TABLE "substation" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "contact" VARCHAR(15) NOT NULL,
    "ip_address" VARCHAR(15) NOT NULL,
    "dcc" VARCHAR(15) NOT NULL,

    CONSTRAINT "substation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feeder" (
    "id" SERIAL NOT NULL,
    "date_of_commisioning" TIMESTAMP(3) NOT NULL,
    "protocol_rtu_address" VARCHAR(20) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "communication_media" VARCHAR(10) NOT NULL,
    "rtu_brands" VARCHAR(20) NOT NULL,
    "ts_cbo" TEXT[],
    "ts_cbc" TEXT[],
    "ts_local" TEXT[],
    "ts_remote" TEXT[],
    "ts_ocrd" TEXT[],
    "ts_ocra" TEXT[],
    "ts_ocrid" TEXT[],
    "ts_ocria" TEXT[],
    "ts_dgrd" TEXT[],
    "ts_dgra" TEXT[],
    "ts_cbtrd" TEXT[],
    "ts_cbtra" TEXT[],
    "ts_ard" TEXT[],
    "ts_ara" TEXT[],
    "ts_arud" TEXT[],
    "ts_arua" TEXT[],
    "ts_tcd" TEXT[],
    "ts_tca" TEXT[],
    "tc_cbo" TEXT[],
    "tc_cbc" TEXT[],
    "tc_aru_use" TEXT[],
    "tc_aru_unuse" TEXT[],
    "tc_reset" TEXT[],
    "tc_tc_raiser" TEXT[],
    "tc_tc_lower" TEXT[],
    "tm_phase_r_current" INTEGER[],
    "tm_phase_s_current" INTEGER[],
    "tm_phase_t_current" INTEGER[],
    "tm_power" INTEGER[],
    "tm_voltage" INTEGER[],
    "tm_phase_r_faultcurrent" INTEGER[],
    "tm_phase_s_faultcurrent" INTEGER[],
    "tm_phase_t_faultcurrent" INTEGER[],
    "tm_phase_n_faultcurrent" INTEGER[],
    "commisioning_types" VARCHAR(15) NOT NULL,
    "ms_engineer" VARCHAR(100) NOT NULL,
    "rtu_engineer" VARCHAR(100) NOT NULL,
    "rtu_reviewer" VARCHAR(100) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'On Review',
    "is_valid" BOOLEAN NOT NULL DEFAULT false,
    "substation_id" INTEGER NOT NULL,

    CONSTRAINT "feeder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "feeder" ADD CONSTRAINT "feeder_substation_id_fkey" FOREIGN KEY ("substation_id") REFERENCES "substation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
