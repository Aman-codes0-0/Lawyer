import { lawyers as mockLawyers } from "@/lib/lawyers-data";

export default function AdminLawyers() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-[#162F6A] dark:text-white">Manage Lawyers</h1>
        <button className="bg-[#214AAB] hover:bg-[#162F6A] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm cursor-pointer">
          + Add Lawyer
        </button>
      </div>

      <div className="bg-white dark:bg-[#162F6A] rounded-xl border border-[#EBEAEA] dark:border-white/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#162F6A] text-white border-b border-[#102047]">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white">Profile</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white">Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white">Role</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEAEA] dark:divide-white/10">
              {mockLawyers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No lawyers added yet.
                  </td>
                </tr>
              ) : (
                mockLawyers.map((lawyer) => (
                  <tr key={lawyer.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      {lawyer.img ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden relative border border-[#214AAB]/30">
                          <img src={lawyer.img} alt={lawyer.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#DDA73A]/20 border border-[#DDA73A]/40 flex items-center justify-center font-bold text-[#8C6207] dark:text-[#DDA73A]">
                          {lawyer.name.charAt(0)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#162F6A] dark:text-white">{lawyer.name}</div>
                      <div className="text-sm text-[#676B7E] dark:text-gray-300">{lawyer.specialization}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#23232A] dark:text-gray-200">{lawyer.role}</td>
                    <td className="px-6 py-4">
                      <button className="text-[#214AAB] dark:text-[#DDA73A] hover:underline mr-4 font-bold text-sm cursor-pointer">Edit</button>
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
