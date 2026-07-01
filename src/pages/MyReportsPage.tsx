import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { dummyReports } from '../data/dummy';
import Header from '../components/Header';
import BackButton from '../components/BackButton';

type TabKey = 'Semua' | 'Proses' | 'Selesai';

export default function MyReportsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as TabKey | null;
  const [activeTab, setActiveTab] = useState<TabKey>(tabParam && ['Semua', 'Proses', 'Selesai'].includes(tabParam) ? tabParam : 'Semua');

  useEffect(() => {
    if (tabParam && ['Semua', 'Proses', 'Selesai'].includes(tabParam)) {
      setActiveTab(tabParam as TabKey);
    }
  }, [tabParam]);

  const tabs: TabKey[] = ['Semua', 'Proses', 'Selesai'];

  const filtered = dummyReports.filter((r) => {
    if (activeTab === 'Semua') return true;
    if (activeTab === 'Proses') return r.status === 'Menunggu' || r.status === 'Diproses';
    return r.status === 'Selesai';
  });

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col pb-6">
      <Header />

      <div className="px-4 py-4">
        <BackButton className="mb-2" />
        {/* <h2 className="text-xl font-bold text-gray-800 mb-4">Laporan Saya</h2> */}
      </div>

      {/* Tabs */}
      <div className="bg-white/80 backdrop-blur flex justify-around border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab ? 'border-blue-900 text-blue-900' : 'border-transparent text-gray-500'
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 flex flex-col gap-4">
        {filtered.map((r) => (
          <div key={r.id} className="bg-white shadow-xl rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow" onClick={() => navigate(`/report/${r.id}`)}>
            <div className="p-4 pb-0 flex gap-4">
              <img src={r.image} alt={r.title} className="w-24 h-20 object-cover rounded-xl" />
              <div className="flex-1">
                <div className="flex justify-between items-center text-[10px] font-bold text-gray-800 mb-1">
                  <span>{r.date} | {r.time.split(' ')[0]}</span>
                  <span className="uppercase">{r.status === 'Selesai' ? 'SELESAI' : 'DIKERJAKAN'}</span>
                </div>
                <h4 className="font-bold text-sm leading-tight mb-1">{r.title}</h4>
                <p className="text-xs text-gray-600 line-clamp-2">{r.description}</p>
              </div>
            </div>

            {/* Content specific to status */}
            <div className="p-4 pt-2">
              {r.status !== 'Selesai' && r.timeline && (
                <div className="mt-4 bg-white rounded-xl p-4">
                  <p className="text-xs font-bold mb-4">Lacak Status</p>
                  <div className="relative">
                    {/* Full track */}
                    <div className="absolute top-[7px] left-[calc(100%/(2*5))] right-[calc(100%/(2*5))] h-0.5 bg-gray-300 z-0" />
                    {/* Filled track */}
                    <div
                      className="absolute top-[7px] left-[calc(100%/(2*5))] h-0.5 bg-[#f97316] transition-all duration-500 z-[1]"
                      style={{
                        width: `calc(${Math.max(0, r.timeline.filter(t => t.isCompleted).length - 1)} * (100% - 100% / ${r.timeline.length}) / ${r.timeline.length - 1})`
                      }}
                    />
                    <div className="grid" style={{ gridTemplateColumns: `repeat(${r.timeline.length}, 1fr)` }}>
                      {r.timeline.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2">
                          <div className={`w-3.5 h-3.5 rounded-full ring-2 ring-white flex-shrink-0 ${step.isCompleted ? 'bg-[#f97316]' : 'bg-gray-300'}`} />
                          <span className={`text-[9px] text-center leading-tight ${step.isCompleted ? 'font-bold text-gray-800' : 'text-gray-500'}`}>{step.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {r.status === 'Selesai' && (
                <div className="mt-4">
                  <div className="inline-block bg-green-200 text-green-800 text-[10px] font-bold px-3 py-1 rounded-full mb-3">
                    Hasil Perbaikan
                  </div>

                  {r.beforeImage && r.afterImage && (
                    <div className="flex gap-2 mb-4">
                      <div className="flex-1 flex flex-col items-center gap-2">
                        <img src={r.beforeImage} alt="Sebelum" className="w-full h-24 object-cover rounded-xl" />
                        <span className="bg-[#ebd9c1] text-xs font-semibold px-4 py-1 rounded-full">Sebelum</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center gap-2">
                        <img src={r.afterImage} alt="Sesudah" className="w-full h-24 object-cover rounded-xl" />
                        <span className="bg-[#b7ebb3] text-xs font-semibold px-4 py-1 rounded-full">Sesudah</span>
                      </div>
                    </div>
                  )}

                  <p className="text-sm font-semibold mb-2">Bagaimana hasil perbaikan ?</p>
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Icon
                        key={s}
                        icon={s <= (r.rating || 0) ? 'solar:star-bold' : 'solar:star-linear'}
                        width={24}
                        color={s <= (r.rating || 0) ? '#f59e0b' : '#d1d5db'}
                      />
                    ))}
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-3 mb-3">
                    <p className="text-sm text-gray-500 italic">{r.reviewComment || 'Tulis komentar anda disini..'}</p>
                  </div>
                  <button className="w-full bg-blue-700 text-white font-semibold py-3 rounded-xl" onClick={(e) => e.stopPropagation()}>
                    Kirim Ulasan
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
