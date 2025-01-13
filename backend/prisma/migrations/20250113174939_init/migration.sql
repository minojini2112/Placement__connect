-- CreateTable
CREATE TABLE "Participation" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "competition_name" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "certificates" TEXT NOT NULL,
    "report" TEXT NOT NULL,

    CONSTRAINT "Participation_pkey" PRIMARY KEY ("id")
);
