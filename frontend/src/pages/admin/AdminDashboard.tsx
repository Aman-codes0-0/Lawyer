import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, Calendar, MessageSquare, Briefcase } from "lucide-react";
import { fetchAppointments, fetchEnquiries } from "@/lib/api";

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);

  useEffect(() => {
    fetchAppointments().then(setAppointments).catch(() => {});
    fetchEnquiries().then(setEnquiries).catch(() => {});
  }, []);

  const stats = [
    { name: "Total Appointments", value: appointments.length.toString(), icon: Calendar, change: "Real-time" },
    { name: "New Enquiries", value: enquiries.length.toString(), icon: MessageSquare, change: "Real-time" },
    { name: "Active Lawyers", value: "8", icon: Users, change: "Fixed" },
    { name: "Practice Areas", value: "6", icon: Briefcase, change: "Fixed" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#162F6A] dark:text-white">Dashboard</h1>
          <p className="text-[#676B7E] dark:text-gray-300 mt-1">Welcome back to LexAdmin Management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => (
          <div key={stat.name} className="bg-white dark:bg-[#162F6A] p-6 rounded-xl border border-[#EBEAEA] dark:border-white/10 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#676B7E] dark:text-gray-300">{stat.name}</p>
              <h3 className="text-3xl font-bold text-[#162F6A] dark:text-white mt-2">{stat.value}</h3>
              <span className="text-xs text-[#214AAB] dark:text-[#DDA73A] font-semibold mt-1 inline-block">{stat.change}</span>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              idx % 2 === 0 ? "bg-[#DDA73A]/15 border border-[#DDA73A]/30 text-[#DDA73A]" : "bg-[#214AAB]/15 border border-[#214AAB]/30 text-[#214AAB] dark:text-[#BAE6FD]"
            }`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white dark:bg-[#162F6A] p-6 rounded-xl border border-[#EBEAEA] dark:border-white/10 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-[#162F6A] dark:text-white font-serif">Recent Appointments</h3>
            <Link to="/admin/dashboard/appointments" className="text-sm text-[#214AAB] dark:text-[#DDA73A] hover:underline font-semibold">View All</Link>
          </div>
          {appointments.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">No recent appointments found.</div>
          ) : (
            <div className="space-y-3">
              {appointments.slice(0, 5).map((apt) => (
                <div key={apt.id} className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 sm:gap-0 p-3.5 hover:bg-[#F1F1F4] dark:hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-[#EBEAEA] dark:hover:border-white/10">
                  <div>
                    <p className="font-bold text-[#162F6A] dark:text-white">{apt.clientName}</p>
                    <p className="text-xs text-[#676B7E] dark:text-gray-300">{apt.caseType} • {new Date(apt.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                    apt.status === "PENDING" ? "bg-[#DDA73A]/20 text-[#8C6207] dark:text-[#DDA73A] border border-[#DDA73A]/40" :
                    apt.status === "APPROVED" ? "bg-[#214AAB]/15 text-[#214AAB] dark:text-[#BAE6FD] border border-[#214AAB]/30" :
                    "bg-gray-100 dark:bg-white/10 text-[#676B7E] dark:text-gray-300"
                  }`}>
                    {apt.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white dark:bg-[#162F6A] p-6 rounded-xl border border-[#EBEAEA] dark:border-white/10 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-[#162F6A] dark:text-white font-serif">Recent Enquiries</h3>
            <Link to="/admin/dashboard/enquiries" className="text-sm text-[#214AAB] dark:text-[#DDA73A] hover:underline font-semibold">View All</Link>
          </div>
          {enquiries.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">No recent enquiries found.</div>
          ) : (
            <div className="space-y-3">
              {enquiries.slice(0, 5).map((enq) => (
                <div key={enq.id} className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 sm:gap-0 p-3.5 hover:bg-[#F1F1F4] dark:hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-[#EBEAEA] dark:hover:border-white/10">
                  <div>
                    <p className="font-bold text-[#162F6A] dark:text-white">{enq.name || enq.email}</p>
                    <p className="text-xs text-[#676B7E] dark:text-gray-300">{enq.subject} • {new Date(enq.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                    enq.status === "UNREAD" ? "bg-red-500/10 text-red-600 border border-red-500/20" : "bg-[#214AAB]/15 text-[#214AAB] dark:text-[#BAE6FD] border border-[#214AAB]/30"
                  }`}>
                    {enq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
