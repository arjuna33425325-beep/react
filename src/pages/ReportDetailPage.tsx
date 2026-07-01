import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { dummyReports } from '../data/dummy';
import polinesLogo from '../assets/polines.png';
import MapView from '../components/MapView';
import AlertModal from '../components/AlertModal';

function StarRating({ rating, onRate, disabled }: { rating: number; onRate: (n: number) => void; disabled: boolean }) {
  return (
    <div className="flex gap-2 justify-center my-3">
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} type="button" disabled={disabled} onClick={() => onRate(s)} className="focus:outline-none transition-transform active:scale-90">
          <Icon
            icon={s <= rating ? 'solar:star-bold' : 'solar:star-linear'}
            width={32}
            className={s <= rating ? 'text-[#f59e0b]' : 'text-gray-300'}
          />
        </button>
      ))}
    </div>
  );
}

export default function ReportDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const report = dummyReports.find((r) => r.id === id);

  const [rating, setRating] = useState(report?.rating || 0);
  const [comment, setComment] = useState(report?.reviewComment || '');
  const [submitted, setSubmitted] = useState(false);
  const [showCancelAlert, setShowCancelAlert] = useState(false);

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">
        <Icon icon="solar:danger-triangle-linear" width={48} color="#ef4444" />
        <p>Laporan tidak ditemukan</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4" onClick={() => navigate(-1)}>Kembali</button>
      </div>
    );
  }

  const statusSteps = ['Dilaporkan', 'Diterima', 'Ditugaskan', 'Proses', 'Selesai'];
  const currentStep = report.status === 'Selesai' ? 4 : report.status === 'Diproses' ? 3 : 0;

  const handleKirimUlasan = () => {
    // Save to the dummy report object so it updates globally
    report.rating = rating;
    report.reviewComment = comment;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f0ece9] flex flex-col pb-24 font-sans relative">
      {/* Header Bar */}
      <div
        className="text-white px-5 py-4 flex items-center justify-between"
        style={{ background: 'linear-gradient(to bottom, #1565C0, #1e88e5)', minHeight: '72px' }}
      >
        <button onClick={() => navigate(-1)} className="p-1 text-white">
          <Icon icon="solar:alt-arrow-left-linear" width={24} />
        </button>
        <div className="w-10 h-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center p-1">
          <img src={polinesLogo} alt="Polines" className="w-full h-full object-contain" />
        </div>
        <img
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          alt="Profile"
          className="w-11 h-11 rounded-full border-2 border-white/30 object-cover"
        />
      </div>

      <div className="px-5 py-6">
        <h2 className="text-center font-bold text-xl text-gray-800 mb-2">Rincian Laporan</h2>
        <div className="w-full h-px bg-gray-400 mb-6"></div>

        {/* Report ID & Status */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-xs text-gray-500">id laporan:</p>
            <p className="font-bold text-gray-900">#{report.id}</p>
          </div>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
            report.status === 'Selesai' ? 'bg-[#b7ebb3] text-green-900' : 'bg-[#ebd9c1] text-yellow-900'
          }`}>
            {report.status}
          </span>
        </div>

        {/* Hero Image */}
        <div className="w-full rounded-3xl overflow-hidden shadow-md mb-6 h-64 bg-white">
          <img src={report.image} alt="Report" className="w-full h-full object-cover" />
        </div>

        {/* Title & Date */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-black mb-1">{report.title}</h1>
          <p className="text-[11px] font-bold text-gray-800">{report.date} | {report.time}</p>
        </div>

        {/* Location Card */}
        <div className="bg-white/80 rounded-2xl p-4 border border-gray-300 mb-4">
          <div className="flex items-start gap-2 mb-3">
            <Icon icon="solar:map-point-linear" width={20} className="text-gray-500 mt-0.5" />
            <div>
              <p className="text-[11px] text-gray-500 font-medium">Lokasi</p>
              <p className="font-bold text-sm text-gray-800">{report.location}</p>
            </div>
          </div>
          <div className="w-full h-36 rounded-xl overflow-hidden relative z-0">
            <MapView lat={-7.0514} lng={110.4371} interactive={false} />
          </div>
        </div>

        {/* Category & Description Card */}
        <div className="bg-white/80 rounded-2xl p-4 border border-gray-300 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-gray-600">Kategori:</span>
            <span className="bg-[#fcd0d0] text-red-900 px-3 py-1 text-[11px] font-semibold rounded-full">
              {report.category}
            </span>
          </div>
          
          <div className="w-full h-px bg-gray-300 mb-4"></div>

          <div>
            <p className="text-xs text-gray-600 mb-1">Deskripsi:</p>
            <p className="text-xs text-gray-800 leading-relaxed">
              {report.description}
            </p>
          </div>
        </div>

        {/* Status Tracker */}
        <div className="mb-8">
          <h3 className="font-bold text-xs text-gray-900 mb-6">Lacak Status</h3>
          <div className="relative">
            {/* Full track */}
            <div className="absolute top-[7px] left-[calc(100%/(2*5))] right-[calc(100%/(2*5))] h-0.5 bg-gray-300 z-0" />
            {/* Filled track */}
            <div
              className="absolute top-[7px] left-[calc(100%/(2*5))] h-0.5 bg-[#f56a2c] transition-all duration-500 z-[1]"
              style={{ width: `calc(${currentStep} * (100% - 100%/${statusSteps.length}) / ${statusSteps.length - 1})` }}
            />
            <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${statusSteps.length}, 1fr)` }}>
              {statusSteps.map((step, i) => (
                <div key={step} className="flex flex-col items-center gap-2">
                  <div className={`w-3.5 h-3.5 rounded-full ring-2 ring-white flex-shrink-0 ${
                    i < currentStep ? 'bg-[#f56a2c]' :
                    i === currentStep ? 'bg-[#002244]' : 'bg-gray-300'
                  }`} />
                  <span className={`text-[9px] text-center leading-tight ${
                    i === currentStep ? 'font-bold text-[#002244]' : 'text-gray-500'
                  }`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rating Section */}
        {report.status === 'Selesai' && (
          <div className="bg-white rounded-2xl p-5 border border-gray-300 shadow-sm mb-8 text-center">
            <h3 className="font-bold text-gray-800 mb-2">Bagaimana hasil perbaikan?</h3>
            <StarRating rating={rating} onRate={(n) => setRating(n)} disabled={submitted} />
            <textarea
              className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs text-gray-700 h-20 resize-none mt-2 outline-none focus:border-blue-500"
              placeholder="Tulis komentar Anda..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={submitted}
            />
            {!submitted ? (
              <button
                type="button"
                className="w-full bg-[#1e58b3] text-white py-3 rounded-xl font-bold mt-4 text-sm hover:bg-blue-800 active:scale-95 transition-all"
                onClick={handleKirimUlasan}
                disabled={rating === 0}
              >
                Kirim Ulasan
              </button>
            ) : (
              <div className="mt-4 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-center gap-1.5 text-green-700 text-sm font-semibold">
                  <Icon icon="solar:check-circle-bold" width={18} />
                  Ulasan telah dikirim. Terima kasih!
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  Ubah Ulasan
                </button>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button 
            className="flex-1 bg-[#1e58b3] text-white py-4 rounded-xl font-medium text-sm flex justify-center items-center gap-2"
            onClick={() => navigate(`/chat/${id}`)}
          >
            <Icon icon="solar:letter-outline" width={18} />
            Hubungi Petugas
          </button>
          <button className="text-[#d32f2f] font-bold text-sm px-4 py-4 hover:underline" onClick={() => setShowCancelAlert(true)}>
            Batalkan
          </button>
        </div>

        <AlertModal
          isOpen={showCancelAlert}
          type="error"
          title={`Laporan\nDibatalkan`}
          description="Laporan Anda telah berhasil dibatalkan."
          onContinue={() => { setShowCancelAlert(false); navigate(-1); }}
        />

      </div>
    </div>
  );
}
