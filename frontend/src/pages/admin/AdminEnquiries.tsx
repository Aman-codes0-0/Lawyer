import { useState, useEffect } from "react";
import { MailOpen, Trash2, RefreshCw, Eye } from "lucide-react";
import { fetchEnquiries } from "@/lib/api";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadEnquiries = async () => {
    setLoading(true);
    const data = await fetchEnquiries();
    setEnquiries(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const markAsRead = async (id: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "READ" }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((enq) => (enq.id === id ? { ...enq, status: "READ" } : enq))
        );
      } else {
        setEnquiries((prev) => {
          const updated = prev.map((enq) => (enq.id === id ? { ...enq, status: "READ" } : enq));
          localStorage.setItem("lexprime_enquiries", JSON.stringify(updated));
          return updated;
        });
      }
    } catch {
      setEnquiries((prev) => {
        const updated = prev.map((enq) => (enq.id === id ? { ...enq, status: "READ" } : enq));
        localStorage.setItem("lexprime_enquiries", JSON.stringify(updated));
        return updated;
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((enq) => enq.id !== id));
      } else {
        setEnquiries((prev) => {
          const updated = prev.filter((enq) => enq.id !== id);
          localStorage.setItem("lexprime_enquiries", JSON.stringify(updated));
          return updated;
        });
      }
    } catch {
      setEnquiries((prev) => {
        const updated = prev.filter((enq) => enq.id !== id);
        localStorage.setItem("lexprime_enquiries", JSON.stringify(updated));
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

  const unreadCount = enquiries.filter((e) => e.status === "UNREAD").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#162F6A] dark:text-white">Contact Enquiries</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-[#8C6207] dark:text-[#DDA73A] font-semibold mt-1">{unreadCount} unread enquiry{unreadCount > 1 ? "ies" : ""}</p>
          )}
        </div>
        <button
          onClick={loadEnquiries}
          className="flex items-center gap-2 text-sm text-[#162F6A] dark:text-[#BAE6FD] hover:text-[#214AAB] border border-[#EBEAEA] dark:border-white/20 bg-white dark:bg-[#162F6A] px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-sm"
        >
          <RefreshCw className="w-4 h-4 text-[#214AAB] dark:text-[#DDA73A]" /> Refresh
        </button>
      </div>

      <div className="bg-white dark:bg-[#162F6A] rounded-xl border border-[#EBEAEA] dark:border-white/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#162F6A] text-white border-b border-[#102047]">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white w-1/4">Sender Details</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white">Subject</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white w-2/5">Message</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white">Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEAEA] dark:divide-white/10">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <tr
                    key={enq.id}
                    className={`hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors ${
                      enq.status === "UNREAD" ? "bg-[#DDA73A]/10 dark:bg-[#DDA73A]/15" : ""
                    }`}
                    onClick={() => setExpandedId(expandedId === enq.id ? null : enq.id)}
                  >
                    <td className="px-6 py-4">
                      <div className={`font-bold ${enq.status === "UNREAD" ? "text-[#162F6A] dark:text-white" : "text-[#23232A] dark:text-gray-300"}`}>{enq.name || enq.email}</div>
                      <div className="text-sm text-[#676B7E] dark:text-gray-400">{enq.email}</div>
                      {enq.phone && <div className="text-sm text-[#676B7E] dark:text-gray-400">{enq.phone}</div>}
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#162F6A] dark:text-white">{enq.subject}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#23232A] dark:text-gray-300 line-clamp-2">
                        {enq.message}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                        enq.status === "UNREAD" ? "bg-[#DDA73A]/20 text-[#8C6207] dark:text-[#DDA73A] border border-[#DDA73A]/40" :
                        "bg-[#214AAB]/15 text-[#214AAB] dark:text-[#BAE6FD] border border-[#214AAB]/30"
                      }`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#676B7E] dark:text-gray-400">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <button
                          title="View"
                          onClick={() => setExpandedId(expandedId === enq.id ? null : enq.id)}
                          className="p-1.5 rounded-lg bg-[#214AAB]/10 text-[#214AAB] hover:bg-[#214AAB]/20 transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {enq.status === "UNREAD" && (
                          <button
                            title="Mark as Read"
                            onClick={() => markAsRead(enq.id)}
                            disabled={updatingId === enq.id}
                            className="p-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            <MailOpen className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          title="Delete"
                          onClick={() => deleteEnquiry(enq.id)}
                          disabled={updatingId === enq.id}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
