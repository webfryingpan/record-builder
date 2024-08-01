-- CreateTable
CREATE TABLE "BoardInspection1" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "week" INTEGER NOT NULL,
    "inspectorName" TEXT NOT NULL,
    "board" TEXT NOT NULL,
    "problemType" TEXT NOT NULL,
    "problemDescription" TEXT NOT NULL,

    CONSTRAINT "BoardInspection1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardInventory1" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "week" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "board" TEXT NOT NULL,

    CONSTRAINT "BoardInventory1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardInspection2" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "week" INTEGER NOT NULL,
    "inspectorName" TEXT NOT NULL,
    "board" TEXT NOT NULL,
    "problemType" TEXT NOT NULL,
    "problemDescription" TEXT NOT NULL,

    CONSTRAINT "BoardInspection2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardInventory2" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "week" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "board" TEXT NOT NULL,

    CONSTRAINT "BoardInventory2_pkey" PRIMARY KEY ("id")
);
