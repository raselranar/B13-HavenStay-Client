import Link from "next/link";

export default function SuccessPage() {
  const booking = {
    contactNumber: "+8801836127131",
    moveInDate: "2026-06-15",
    propertyId: "6a3518c465cbca76c268cb40",
    rent: "4500",
    title: "Metropolitan Loft",
    userId: "6a350ab41b12408ad00d6aaa",
    paymentStatus: "paid",
    bookingStatus: "pending",
    createdAt: "2026-06-25T00:37:53.965+00:00",
  };

  const formattedCreatedAt = new Date(booking.createdAt).toLocaleString();

  return (
    <main className="min-h-screen bg-slate-50 py-20 px-4 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/40">
        <div className="mb-8 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-indigo-600">
            Booking received
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Thank you — your payment was successful
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            We received your payment for{" "}
            <strong className="text-slate-900">{booking.title}</strong>. A
            booking confirmation will be sent to your email shortly.
          </p>
        </div>

        <div className="space-y-6 rounded-3xl border border-slate-100 bg-slate-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-green-100 text-green-700">
              ✓
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Booking summary
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Below are the details for your booking.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs text-slate-500">Property</p>
                <p className="font-medium text-slate-900">{booking.title}</p>
                <p className="mt-1 text-xs text-slate-500 break-all">
                  ID: {booking.propertyId}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Tenant</p>
                <p className="font-medium text-slate-900">
                  User ID: {booking.userId}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Contact: {booking.contactNumber}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Move-in date</p>
                <p className="font-medium text-slate-900">
                  {booking.moveInDate}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Rent</p>
                <p className="font-medium text-slate-900">${booking.rent}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Payment status</p>
                <p className="font-medium text-slate-900">
                  {booking.paymentStatus}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Booking status</p>
                <p className="font-medium text-slate-900">
                  {booking.bookingStatus}
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Created: {formattedCreatedAt}
            </p>
          </div>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/dashboard/tenant/my-bookings"
              className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
              View your bookings
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
              Return home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
