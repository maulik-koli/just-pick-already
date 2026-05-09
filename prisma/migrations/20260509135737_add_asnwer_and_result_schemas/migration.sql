-- CreateEnum
CREATE TYPE "Zone" AS ENUM ('SOCIAL_SITUATOINS', 'RELATIONSHIPS', 'CAREER', 'MORAL_GRAY_AREAS', 'INPULSE_VS_LOGIC');

-- CreateTable
CREATE TABLE "answers" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "zone" "Zone" NOT NULL,
    "selectedOptionId" TEXT NOT NULL,
    "selectedOptionText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "results" (
    "sessionId" TEXT NOT NULL,
    "resultData" JSONB NOT NULL,
    "promptVersion" INTEGER NOT NULL DEFAULT 1,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "results_pkey" PRIMARY KEY ("sessionId")
);

-- CreateIndex
CREATE INDEX "answers_sessionId_idx" ON "answers"("sessionId");

-- CreateIndex
CREATE INDEX "answers_zone_idx" ON "answers"("zone");

-- CreateIndex
CREATE UNIQUE INDEX "answers_sessionId_questionId_key" ON "answers"("sessionId", "questionId");

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
