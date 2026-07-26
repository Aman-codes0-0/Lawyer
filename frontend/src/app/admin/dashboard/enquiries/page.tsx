"use client";

import { useState, useEffect } from "react";
import { MailOpen, Trash2, RefreshCw, Eye } from "lucide-react";

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

  const fetchEnquiries = async () => {
    setLoading(true);
    const res = await fetch("/api/enquiries");
    const data = await res.json();
    setEnquiries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
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
      }
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
      }
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
          <h1 className="text-3xl font-serif font-bold text-navy">Contact Enquiries</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-red-500 font-medium mt-1">{unreadCount} unread enquiry{unreadCount > 1 ? "ies" : ""}</p>
          )}
        </div>
        <button
          onClick={fetchEnquiries}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy border border-gray-200 px-3 py-2 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
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
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <>
                    <tr
                      key={enq.id}
                      className={`hover:bg-gray-50/50 cursor-pointer ${enq.status === "UNREAD" ? "bg-yellow-50/30" : ""}`}
                      onClick={() => setExpandedId(expandedId === enq.id ? null : enq.id)}
                    >
                      <td className="px-6 py-4">
                        <div className={`font-bold ${enq.status === "UNREAD" ? "text-navy" : "text-gray-700"}`}>{enq.name}</div>
                        <div className="text-sm text-gray-500">{enq.email}</div>
                        {enq.phone && <div className="text-sm text-gray-400">{enq.phone}</div>}
                      </td>
                      <td className="px-6 py-4 font-medium text-navy">{enq.subject}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 line-clamp-2">
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
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <button
                            title="View"
                            onClick={() => setExpandedId(expandedId === enq.id ? null : enq.id)}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {enq.status === "UNREAD" && (
                            <button
                              title="Mark as Read"
                              onClick={() => markAsRead(enq.id)}
                              disabled={updatingId === enq.id}
                              className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors disabled:opacity-50"
                            >
                              <MailOpen className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            title="Delete"
                            onClick={() => deleteEnquiry(enq.id)}
                            disabled={updatingId === enq.id}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedId === enq.id && (
                      <tr key={`${enq.id}-expanded`} className="bg-blue-50/50">
                        <td colSpan={6} className="px-8 py-6">
                          <div className="max-w-3xl">
                            <p className="text-sm font-bold text-gray-600 mb-2">Full Message:</p>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{enq.message}</p>
                            <div className="mt-4 flex gap-4">
                              <a
                                href={`mailto:${enq.email}?subject=Re: ${enq.subject}`}
                                className="text-sm font-bold text-gold hover:underline"
                              >
                                Reply via Email →
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
