import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react";
import { fetchAppointments } from "@/lib/api";

interface Appointment {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  caseType: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: string;
  createdAt: string;
}

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadAppointments = async () => {
    setLoading(true);
    const data = await fetchAppointments();
    setAppointments(data);
    setLoading(false);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
        );
      } else {
        // Local fallback update
        setAppointments((prev) => {
          const updated = prev.map((apt) => (apt.id === id ? { ...apt, status } : apt));
          localStorage.setItem("lexprime_appointments", JSON.stringify(updated));
          return updated;
        });
      }
    } catch {
      setAppointments((prev) => {
        const updated = prev.map((apt) => (apt.id === id ? { ...apt, status } : apt));
        localStorage.setItem("lexprime_appointments", JSON.stringify(updated));
        return updated;
      });
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-navy">Appointments</h1>
        <button
          onClick={loadAppointments}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy border border-gray-200 px-3 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Pending", status: "PENDING", color: "yellow", count: appointments.filter((a) => a.status === "PENDING").length },
          { label: "Approved", status: "APPROVED", color: "green", count: appointments.filter((a) => a.status === "APPROVED").length },
          { label: "Rejected", status: "REJECTED", color: "red", count: appointments.filter((a) => a.status === "REJECTED").length },
        ].map((s) => (
          <div key={s.status} className={`bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center`}>
            <p className="text-2xl font-bold text-navy">{s.count}</p>
            <p className={`text-sm font-medium text-${s.color}-600`}>{s.label}</p>
          </div>
        ))}
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
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Actions</th>
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
                        apt.status === "REJECTED" ? "bg-red-100 text-red-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {apt.status !== "APPROVED" && (
                          <button
                            onClick={() => updateStatus(apt.id, "APPROVED")}
                            disabled={updatingId === apt.id}
                            title="Approve"
                            className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {apt.status !== "REJECTED" && (
                          <button
                            onClick={() => updateStatus(apt.id, "REJECTED")}
                            disabled={updatingId === apt.id}
                            title="Reject"
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        {apt.status !== "PENDING" && (
                          <button
                            onClick={() => updateStatus(apt.id, "PENDING")}
                            disabled={updatingId === apt.id}
                            title="Reset to Pending"
                            className="p-1.5 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                        )}
                      </div>
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
