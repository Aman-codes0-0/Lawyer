import { prisma } from "@/lib/prisma";

export default async function AdminEnquiries() {
  const enquiries = await prisma.contactEnquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-navy">Contact Enquiries</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 w-1/4">Sender Details</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Subject</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 w-2/5">Message</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Status</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="font-bold text-navy">{enq.name}</div>
                      <div className="text-sm">{enq.email}</div>
                      {enq.phone && <div className="text-sm text-gray-500">{enq.phone}</div>}
                    </td>
                    <td className="px-6 py-4 font-medium text-navy">{enq.subject}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 line-clamp-2" title={enq.message}>
                        {enq.message}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        enq.status === "UNREAD" ? "bg-red-100 text-red-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
