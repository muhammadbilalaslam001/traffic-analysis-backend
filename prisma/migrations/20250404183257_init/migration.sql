-- CreateTable
CREATE TABLE "Traffic" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Traffic_pkey" PRIMARY KEY ("id")
);
