-- CreateTable
CREATE TABLE "BoardInspection" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "inspectorName" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "problemType" TEXT NOT NULL,
    "problemDescription" TEXT NOT NULL,

    CONSTRAINT "BoardInspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardInventory" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "boardId" TEXT NOT NULL,

    CONSTRAINT "BoardInventory_pkey" PRIMARY KEY ("id")
);
