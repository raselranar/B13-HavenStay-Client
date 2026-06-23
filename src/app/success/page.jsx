"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <main className="min-h-screen bg-slate-50 py-20 px-4 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/40">
        <div className="mb-8 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-indigo-600">
            Booking confirmed
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Thank you for your reservation!
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Your payment is complete and your property booking has been
            successfully processed.
          </p>
        </div>

        <div className="space-y-6 rounded-3xl border border-slate-100 bg-slate-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-green-100 text-green-700">
              ✓
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Booking Status
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Your reservation is confirmed. We&apos;ll send you a
                confirmation email shortly.
              </p>
            </div>
          </div>

          {sessionId ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
              <p className="font-medium text-slate-900">Stripe session ID</p>
              <p className="mt-2 break-all">{sessionId}</p>
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No session ID was provided. If you arrived here after payment, the
              transaction should still be complete.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
