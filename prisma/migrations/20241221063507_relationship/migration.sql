/*
  Warnings:

  - You are about to drop the column `description` on the `FoodCategory` table. All the data in the column will be lost.
  - Made the column `image_url` on table `FoodItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image_url` on table `Restaurant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FoodCategory" DROP COLUMN "description",
ADD COLUMN     "urlkey" TEXT;

-- AlterTable
ALTER TABLE "FoodItem" ALTER COLUMN "image_url" SET NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "accepts_instructions" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "address_line2" TEXT,
ADD COLUMN     "customer_type" TEXT NOT NULL DEFAULT 'all',
ADD COLUMN     "delivery_provider" TEXT NOT NULL DEFAULT 'unknown',
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_best_in_city" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "minimum_delivery_time" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "minimum_order_amount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "original_delivery_fee" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "review_number" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tag" TEXT,
ALTER COLUMN "image_url" SET NOT NULL;

-- CreateTable
CREATE TABLE "primary_cuisine" (
    "category_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "urlKey" TEXT NOT NULL,
    "restaurantRestaurant_id" INTEGER,

    CONSTRAINT "primary_cuisine_pkey" PRIMARY KEY ("category_id")
);

-- AddForeignKey
ALTER TABLE "primary_cuisine" ADD CONSTRAINT "primary_cuisine_restaurantRestaurant_id_fkey" FOREIGN KEY ("restaurantRestaurant_id") REFERENCES "Restaurant"("restaurant_id") ON DELETE SET NULL ON UPDATE CASCADE;
