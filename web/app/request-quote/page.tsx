import { Suspense } from "react";
import { RequestQuoteContent } from "./request-quote-content";

function RequestQuoteFallback() {
  return (
    <div className="min-h-screen flex flex-col bg-background animate-pulse">
      <div className="h-24 bg-muted/30" />
      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 bg-muted/50 rounded w-64 mb-4" />
          <div className="h-5 bg-muted/30 rounded w-full max-w-xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="h-96 bg-muted/20 rounded-lg" />
        </div>
      </main>
      <div className="h-64 bg-muted/30" />
    </div>
  );
}

export default function RequestQuotePage() {
  return (
    <Suspense fallback={<RequestQuoteFallback />}>
      <RequestQuoteContent />
    </Suspense>
  );
}
