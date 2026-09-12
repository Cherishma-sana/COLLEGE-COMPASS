-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "colleges" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "location" VARCHAR(100),
    "fees" INTEGER,
    "rating" DECIMAL(2,1),
    "placement_percent" INTEGER,
    "courses" TEXT[],
    "description" TEXT,
    "state" VARCHAR(100),

    CONSTRAINT "colleges_pkey" PRIMARY KEY ("id")
);
