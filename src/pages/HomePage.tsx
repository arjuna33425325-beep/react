import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { dummyReports, quickCategories } from '../data/dummy';
import Header from '../components/Header';
import StatusBadge from '../components/StatusBadge';

export default function HomePage() {
  const navigate = useNavigate();
  const recentReports = dummyReports.slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col pb-6">
      <Header />

      <div className="px-4 mt-4 relative z-10">
        {/* Status Card */}
        <div className="bg-[#f0ece9] rounded-3xl p-5 shadow-xl">
          <p className="text-sm text-gray-800">Status Laporan Anda</p>
          <h2 className="text-xl font-bold mt-1 mb-4">2 Laporan Berjalan</h2>
          <div className="grid grid-cols-3 gap-3">
            <div
              className="bg-[#ebd9c1] rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer hover:brightness-95 active:scale-95 transition-all"
              onClick={() => navigate('/reports?tab=Proses')}
            >
              <span className="text-2xl font-bold">{dummyReports.filter(r => r.status === 'Menunggu').length}</span>
              <span className="text-[10px] uppercase font-medium">Menunggu</span>
            </div>
            <div
              className="bg-[#eac4b3] rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer hover:brightness-95 active:scale-95 transition-all"
              onClick={() => navigate('/reports?tab=Proses')}
            >
              <span className="text-2xl font-bold">{dummyReports.filter(r => r.status === 'Diproses').length}</span>
              <span className="text-[10px] uppercase font-medium">Diproses</span>
            </div>
            <div
              className="bg-[#b7ebb3] rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer hover:brightness-95 active:scale-95 transition-all"
              onClick={() => navigate('/reports?tab=Selesai')}
            >
              <span className="text-2xl font-bold">{dummyReports.filter(r => r.status === 'Selesai').length}</span>
              <span className="text-[10px] uppercase font-medium">Selesai</span>
            </div>
          </div>
        </div>

        {/* Lapor Button */}
        <button
          className="w-full bg-[#aa3b02] text-white rounded-3xl p-4 mt-4 flex items-center justify-between"
          onClick={() => navigate('/report-form')}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-10 border-2 border-white/40 rounded-lg flex items-center justify-center">
              <Icon icon="solar:camera-bold" width={24} />
            </div>
            <div className="text-left">
              <p className="font-bold text-lg leading-tight">Lapor Kerusakan</p>
              <p className="text-xs text-white/80">Ambil foto & buat laporan baru</p>
            </div>
          </div>
          <Icon icon="solar:alt-arrow-right-bold" width={24} />
        </button>

        {/* Kategori */}
        <div className="mt-6">
          <h3 className="font-bold text-lg mb-3">Kategori</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickCategories.map((cat, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer" onClick={() => navigate('/explore')}>
                <Icon icon={cat.iconName} width={24} className="text-blue-900 mb-2" />
                <p className="text-sm font-semibold text-gray-700">{cat.label}</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">{cat.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Laporan Terbaru */}
        <div className="mt-6">
          <div className="flex justify-between items-end mb-3">
            <h3 className="font-bold text-lg">Laporan Terbaru</h3>
            <button className="text-sm text-gray-600" onClick={() => navigate('/reports')}>Lihat Semua</button>
          </div>
          <div className="flex flex-col gap-4">
            {recentReports.map(r => (
              <div key={r.id} className="bg-[#f2efe9] rounded-2xl p-4 flex gap-4 cursor-pointer relative shadow-sm" onClick={() => navigate(`/report/${r.id}`)}>
                <img src={r.image} alt={r.title} className="w-20 h-20 object-cover rounded-xl" />
                <div className="flex-1 pt-1">
                  <div className="absolute top-3 right-3">
                    <StatusBadge status={r.status} />
                  </div>
                  <h4 className="font-bold text-sm leading-tight max-w-[70%]">{r.title}</h4>
                  <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                    <Icon icon="solar:map-point-linear" />
                    {r.location}
                  </p>
                  <p className="text-[10px] text-gray-500 italic mt-2">{r.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
