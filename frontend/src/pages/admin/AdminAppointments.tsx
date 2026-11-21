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
        <h1 className="text-3xl font-serif font-bold text-[#162F6A] dark:text-white">Appointments</h1>
        <button
          onClick={loadAppointments}
          className="flex items-center gap-2 text-sm text-[#162F6A] dark:text-[#BAE6FD] hover:text-[#214AAB] border border-[#EBEAEA] dark:border-white/20 bg-white dark:bg-[#162F6A] px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-sm"
        >
          <RefreshCw className="w-4 h-4 text-[#214AAB] dark:text-[#DDA73A]" /> Refresh
        </button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Pending", status: "PENDING", colorClasses: "bg-[#DDA73A]/15 text-[#8C6207] dark:text-[#DDA73A] border-[#DDA73A]/30", count: appointments.filter((a) => a.status === "PENDING").length },
          { label: "Approved", status: "APPROVED", colorClasses: "bg-[#214AAB]/15 text-[#214AAB] dark:text-[#BAE6FD] border-[#214AAB]/30", count: appointments.filter((a) => a.status === "APPROVED").length },
          { label: "Rejected", status: "REJECTED", colorClasses: "bg-red-500/10 text-red-500 border-red-500/30", count: appointments.filter((a) => a.status === "REJECTED").length },
        ].map((s) => (
          <div key={s.status} className={`bg-white dark:bg-[#162F6A] p-5 rounded-xl border ${s.colorClasses.split(' ').filter(c => c.startsWith('border-')).join(' ')} shadow-sm text-center`}>
            <p className="text-3xl font-bold text-[#162F6A] dark:text-white">{s.count}</p>
            <p className={`text-xs font-bold uppercase tracking-wider mt-1 ${s.colorClasses.split(' ').filter(c => c.startsWith('text-')).join(' ')}`}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#162F6A] rounded-xl border border-[#EBEAEA] dark:border-white/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#162F6A] text-white border-b border-[#102047]">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white">Client Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white">Contact</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white">Case Type</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white">Preferred Date/Time</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEAEA] dark:divide-white/10">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#162F6A] dark:text-white">{apt.clientName}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#23232A] dark:text-white font-medium">{apt.email}</div>
                      <div className="text-sm text-[#676B7E] dark:text-gray-300">{apt.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-[#214AAB]/15 text-[#214AAB] dark:text-[#BAE6FD] border border-[#214AAB]/30 text-xs rounded-lg uppercase tracking-wider font-bold">
                        {apt.caseType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#23232A] dark:text-white font-medium">{new Date(apt.preferredDate).toLocaleDateString()}</div>
                      <div className="text-sm text-[#676B7E] dark:text-gray-300 capitalize">{apt.preferredTime}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                        apt.status === "PENDING" ? "bg-[#DDA73A]/20 text-[#8C6207] dark:text-[#DDA73A] border border-[#DDA73A]/40" :
                        apt.status === "APPROVED" ? "bg-[#214AAB]/15 text-[#214AAB] dark:text-[#BAE6FD] border border-[#214AAB]/30" :
                        apt.status === "REJECTED" ? "bg-red-500/10 text-red-500 border border-red-500/30" :
                        "bg-gray-100 dark:bg-white/10 text-[#676B7E] dark:text-gray-300"
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
                            className="p-2 rounded-lg bg-[#214AAB]/10 text-[#214AAB] hover:bg-[#214AAB]/20 transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {apt.status !== "REJECTED" && (
                          <button
                            onClick={() => updateStatus(apt.id, "REJECTED")}
                            disabled={updatingId === apt.id}
                            title="Reject"
                            className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        {apt.status !== "PENDING" && (
                          <button
                            onClick={() => updateStatus(apt.id, "PENDING")}
                            disabled={updatingId === apt.id}
                            title="Reset to Pending"
                            className="p-2 rounded-lg bg-[#DDA73A]/15 text-[#8C6207] dark:text-[#DDA73A] hover:bg-[#DDA73A]/25 transition-colors disabled:opacity-50 cursor-pointer"
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
