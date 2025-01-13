-- DropIndex
DROP INDEX "User_email_key";

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "register_number" TEXT NOT NULL,
    "roll_no" TEXT NOT NULL,
    "staff_incharge" TEXT NOT NULL,
    "class_incharge" TEXT NOT NULL,
    "placement_head" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");
