import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { dummyReports, buildingOptions, damageOptions } from '../data/dummy';
import Header from '../components/Header';
import BackButton from '../components/BackButton';

export default function ExplorePage() {
  const navigate = useNavigate();
  const [activeBuilding, setActiveBuilding] = useState('all');
  const [activeDamage, setActiveDamage] = useState('all');

  const filteredReports = dummyReports.filter(r => {
    // Building Filter
    if (activeBuilding !== 'all' && activeBuilding !== 'more') {
      const loc = r.location.toLowerCase();
      if (activeBuilding === 'gkt' && !loc.includes('gkt')) return false;
      if (activeBuilding === 'sa' && !loc.includes('sa')) return false;
      if (activeBuilding === 'sb' && !loc.includes('sb')) return false;
      if (activeBuilding === 'mst' && !(loc.includes('mst') || loc.includes('magister'))) return false;
    }
    // Damage Filter
    if (activeDamage !== 'all' && activeDamage !== 'more') {
      const cat = r.category.toLowerCase();
      const desc = r.description.toLowerCase();
      const fac = r.facility.toLowerCase();
      if (activeDamage === 'pc' && !(cat.includes('komputer') || cat.includes('elektronik') || fac.includes('komputer'))) return false;
      if (activeDamage === 'jaringan' && !(cat.includes('jaringan') || cat.includes('wifi') || fac.includes('wifi') || fac.includes('jaringan'))) return false;
      if (activeDamage === 'kursi' && !(cat.includes('kursi') || cat.includes('meja') || desc.includes('kursi') || desc.includes('meja'))) return false;
      if (activeDamage === 'ac' && !(cat.includes('ac') || cat.includes('ventilasi') || fac.includes('hvac'))) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#e5e5e5] flex flex-col pb-6">
      <Header />
      
      <div className="px-4 py-4 flex flex-col gap-4">
        <BackButton />
        {/* Filter Bangunan */}
        <div>
          <span className="inline-block bg-[#c4d2fa] text-blue-900 font-bold px-3 py-1 text-xs rounded-full mb-3">
            Filter Bangunan
          </span>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {buildingOptions.map((b) => (
              <div 
                key={b.id} 
                className={`flex flex-col items-center justify-center min-w-[70px] h-[70px] rounded-xl cursor-pointer ${
                  activeBuilding === b.id ? 'bg-[#b7a8a0] text-black shadow-inner' : 'bg-[#d6d0cb] text-gray-800'
                }`}
                onClick={() => setActiveBuilding(b.id)}
              >
                <Icon icon={b.icon!} width={28} className="mb-1" />
                <span className="text-[11px] font-bold">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Kerusakan */}
        <div>
          <span className="inline-block bg-[#f47b7b] text-white font-bold px-3 py-1 text-xs rounded-full mb-3">
            Filter Kerusakan
          </span>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {damageOptions.map((d) => (
              <div 
                key={d.id} 
                className={`flex flex-col items-center justify-center min-w-[70px] h-[70px] rounded-xl cursor-pointer ${
                  activeDamage === d.id ? 'bg-[#b7a8a0] text-black shadow-inner' : 'bg-[#d6d0cb] text-gray-800'
                }`}
                onClick={() => setActiveDamage(d.id)}
              >
                <Icon icon={d.icon!} width={28} className="mb-1" />
                <span className="text-[11px] font-bold">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Search — clicking redirects to /search */}
        <div className="flex flex-col gap-3 mt-2">
          <div 
            className="bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/search')}
          >
            <Icon icon="solar:magnifer-linear" width={18} className="text-gray-400" />
            <span className="text-sm text-gray-400 select-none">Search for...</span>
          </div>
          <div className="flex gap-2">
            <span className="bg-[#1e58b3] text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase">Filter</span>
            {activeBuilding !== 'all' && activeBuilding !== 'more' && (
              <span className="bg-[#1e58b3] text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase">{activeBuilding}</span>
            )}
            {activeDamage !== 'all' && activeDamage !== 'more' && (
              <span className="bg-[#1e58b3] text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase">{activeDamage}</span>
            )}
          </div>
        </div>

        {/* Report List */}
        <div className="flex flex-col gap-4 mt-2">
          {filteredReports.map(r => (
            <div key={r.id} className="bg-[#f0ece9] border border-white/50 rounded-2xl p-4 relative shadow-sm cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => navigate(`/report/${r.id}`)}>
              <div className="absolute top-4 right-4 z-10">
                <span className={`px-3 py-1 text-xs font-semibold rounded-lg shadow-sm border border-yellow-800/10 ${
                  r.status === 'Selesai' ? 'bg-[#b7ebb3] text-green-900' : 'bg-[#ebd9c1] text-yellow-900'
                }`}>{r.status}</span>
              </div>
              <div className="flex gap-4">
                <img src={r.image} alt={r.title} className="w-28 h-28 object-cover rounded-xl shadow-inner" />
                <div className="flex-1 pt-1 mt-6">
                  <h4 className="font-bold text-[15px] text-gray-900 leading-tight mb-2">{r.title}</h4>
                  <p className="text-xs text-gray-700 flex items-start gap-1">
                    <Icon icon="solar:map-point-linear" className="mt-0.5 min-w-[16px]" width={16} />
                    {r.location}
                  </p>
                  <p className="text-[11px] text-gray-600 italic mt-2 ml-5">{r.date}</p>
                </div>
              </div>
            </div>
          ))}
          {filteredReports.length === 0 && (
            <div className="text-center py-12 flex flex-col items-center justify-center gap-4 bg-[#f0ece9]/60 rounded-2xl p-6 border border-white/40 shadow-sm">
              <Icon icon="solar:magnifer-linear" width={48} className="text-gray-400" />
              <p className="text-gray-600 font-semibold text-sm">Tidak ada laporan yang sesuai dengan filter.</p>
              <button 
                onClick={() => {
                  setActiveBuilding('all');
                  setActiveDamage('all');
                }}
                className="bg-[#1e58b3] text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow hover:bg-blue-800 active:scale-95 transition-all"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
