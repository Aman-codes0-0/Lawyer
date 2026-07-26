import { prisma } from "@/lib/prisma";
import { Users, Calendar, MessageSquare, Briefcase } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [appointmentsCount, enquiriesCount, recentAppointments, recentEnquiries] = await Promise.all([
    prisma.appointment.count(),
    prisma.contactEnquiry.count(),
    prisma.appointment.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.contactEnquiry.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const stats = [
    { name: "Total Appointments", value: appointmentsCount, icon: Calendar, change: "Real-time" },
    { name: "New Enquiries", value: enquiriesCount, icon: MessageSquare, change: "Real-time" },
    { name: "Active Lawyers", value: "6", icon: Users, change: "Fixed" },
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <Link href="/admin/dashboard/appointments" className="text-sm text-gold hover:underline">View All</Link>
          </div>
          {recentAppointments.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No recent appointments found.</div>
          ) : (
            <div className="space-y-4">
              {recentAppointments.map((apt) => (
                <div key={apt.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
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
            <Link href="/admin/dashboard/enquiries" className="text-sm text-gold hover:underline">View All</Link>
          </div>
          {recentEnquiries.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No recent enquiries found.</div>
          ) : (
            <div className="space-y-4">
              {recentEnquiries.map((enq) => (
                <div key={enq.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                  <div>
                    <p className="font-bold text-navy">{enq.name}</p>
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
