import type { Metadata } from "next";
import { Suspense } from "react";
import { SuccessContent } from "@/components/checkout/SuccessContent";
import { Spinner } from "@/components/ui/spinner";

export const metadata: Metadata = {
  title: "Pedido confirmado",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <Spinner className="h-8 w-8 text-blood" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
