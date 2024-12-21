"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="w-full">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full">
          <Skeleton className="w-full h-[200px] rounded-md" />
        </div>
        <div className="flex items-start w-full p-2 justify-between">
          <div className="w-3/4">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <div className="flex gap-2">
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <div className="flex items-center w-1/4 justify-end">
            <Skeleton className="h-6 w-12" />
          </div>
        </div>
      </div>
    </Card>
  );
}