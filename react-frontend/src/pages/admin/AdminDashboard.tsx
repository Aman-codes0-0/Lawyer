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
          <h1 className="text-3xl font-serif font-bold text-navy">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back to LexAdmin</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <h3 className="text-3xl font-bold text-navy mt-2">{stat.value}</h3>
              <span className="text-xs text-gray-400 font-medium mt-1 inline-block">{stat.change}</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-navy">Recent Appointments</h3>
            <Link to="/admin/dashboard/appointments" className="text-sm text-gold hover:underline">View All</Link>
          </div>
          {appointments.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No recent appointments found.</div>
          ) : (
            <div className="space-y-4">
              {appointments.slice(0, 5).map((apt) => (
                <div key={apt.id} className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 sm:gap-0 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                  <div>
                    <p className="font-bold text-navy">{apt.clientName}</p>
                    <p className="text-xs text-gray-500">{apt.caseType} • {new Date(apt.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    apt.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                    apt.status === "APPROVED" ? "bg-green-100 text-green-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {apt.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-navy">Recent Enquiries</h3>
            <Link to="/admin/dashboard/enquiries" className="text-sm text-gold hover:underline">View All</Link>
          </div>
          {enquiries.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No recent enquiries found.</div>
          ) : (
            <div className="space-y-4">
              {enquiries.slice(0, 5).map((enq) => (
                <div key={enq.id} className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 sm:gap-0 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                  <div>
                    <p className="font-bold text-navy">{enq.name || enq.email}</p>
                    <p className="text-xs text-gray-500">{enq.subject} • {new Date(enq.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    enq.status === "UNREAD" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
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
