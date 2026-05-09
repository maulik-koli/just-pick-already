-- CreateEnum
CREATE TYPE "AgeRange" AS ENUM ('UNDER_18', 'AGE_18_24', 'AGE_25_34', 'AGE_35_44', 'AGE_45_54', 'AGE_55_PLUS');

-- CreateEnum
CREATE TYPE "Vibe" AS ENUM ('CHILL', 'CURIOUS', 'AMBITIOUS', 'OVERTHINKING', 'STRESSED', 'OPTIMISTIC');

-- CreateEnum
CREATE TYPE "DecisionStyle" AS ENUM ('TRUST_YOUR_GUT', 'THINK_IT_THROUGH', 'ASK_FOR_ADVICE', 'WAIT_AND_SEE', 'TAKE_THE_BOLD_OPTION');

-- CreateEnum
CREATE TYPE "SelfDescription" AS ENUM ('KEEP_OPTIONS_OPEN', 'KNOW_WHAT_I_WANT', 'CHANGE_MY_MIND_OFTEN', 'GO_WITH_WHAT_FEELS_RIGHT', 'IT_DEPENDS_ON_THE_SITUATION');

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "ageRange" "AgeRange" NOT NULL,
    "vibe" "Vibe" NOT NULL,
    "decisionStyle" "DecisionStyle" NOT NULL,
    "selfDescription" "SelfDescription" NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);
