import { prisma } from "@/lib/prisma";

export default async function AdminAppointments() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-navy">Appointments</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Client Name</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Contact</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Case Type</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Preferred Date/Time</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Status</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Requested On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-bold text-navy">{apt.clientName}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{apt.email}</div>
                      <div className="text-sm text-gray-500">{apt.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded uppercase tracking-wider font-bold">
                        {apt.caseType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{new Date(apt.preferredDate).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-500 capitalize">{apt.preferredTime}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        apt.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                        apt.status === "APPROVED" ? "bg-green-100 text-green-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(apt.createdAt).toLocaleDateString()}
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
