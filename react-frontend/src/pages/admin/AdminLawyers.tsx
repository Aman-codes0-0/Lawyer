import { lawyers as mockLawyers } from "@/lib/lawyers-data";

export default function AdminLawyers() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-navy">Manage Lawyers</h1>
        <button className="bg-gold hover:bg-gold-light text-navy px-4 py-2 rounded font-bold transition-colors cursor-pointer">
          + Add Lawyer
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Profile</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Name</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Role</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockLawyers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No lawyers added yet.
                  </td>
                </tr>
              ) : (
                mockLawyers.map((lawyer) => (
                  <tr key={lawyer.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      {lawyer.img ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden relative">
                          <img src={lawyer.img} alt={lawyer.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                          {lawyer.name.charAt(0)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-navy">{lawyer.name}</div>
                      <div className="text-sm text-gray-500">{lawyer.specialization}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">{lawyer.role}</td>
                    <td className="px-6 py-4">
                      <button className="text-gold hover:underline mr-4 font-bold text-sm cursor-pointer">Edit</button>
                      <button className="text-red-500 hover:underline font-bold text-sm cursor-pointer">Remove</button>
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
