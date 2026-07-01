import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import AlertModal from '../components/AlertModal';
import MapView from '../components/MapView';
import { facilityOptions } from '../data/dummy';

export default function ReportFormPage() {
  const navigate = useNavigate();
  const [priority, setPriority] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [coords, setCoords] = useState({ lat: -7.0514, lng: 110.4371 });
  const [facility, setFacility] = useState('Pilih Fasilitas');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ image?: string; facility?: string; description?: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = () => {
    const newErrors: { image?: string; facility?: string; description?: string } = {};
    if (!imagePreview) {
      newErrors.image = 'Foto kerusakan wajib diunggah/diambil.';
    }
    if (facility === 'Pilih Fasilitas') {
      newErrors.facility = 'Silakan pilih jenis fasilitas.';
    }
    if (!description.trim()) {
      newErrors.description = 'Deskripsi kerusakan wajib diisi.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col pb-6">
      <Header />
      
      <div className="px-4 py-4 flex flex-col gap-6">
        <BackButton className="mb-0" />
        {/* Step 1: Upload */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-xs font-bold">1</div>
            <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wide">Upload Foto Kerusakan</h3>
          </div>
          <div 
            className="border-2 border-dashed border-gray-400 bg-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative"
            onClick={handleCameraClick}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <>
                <div className="w-14 h-14 bg-gray-300 rounded-xl flex items-center justify-center mb-3">
                  <Icon icon="solar:camera-bold" width={28} className="text-blue-900" />
                </div>
                <p className="font-bold text-blue-900 mb-1">Ambil Foto</p>
                <p className="text-sm text-gray-600">Ketuk untuk membuka kamera</p>
              </>
            )}
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
          <p className="text-[10px] text-gray-500 italic mt-2">*) Pastikan foto menunjukkan detail kerusakan dengan jelas.</p>
          {errors.image && <p className="text-red-600 text-xs font-semibold mt-1">{errors.image}</p>}
        </div>

        {/* Step 2: Details */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-xs font-bold">2</div>
            <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wide">Detail Laporan</h3>
          </div>
          
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Jenis Fasilitas</label>
              <div className="relative">
                <select 
                  className={`w-full bg-gray-100 border rounded-xl p-3 appearance-none text-sm text-gray-700 ${errors.facility ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  value={facility}
                  onChange={(e) => setFacility(e.target.value)}
                >
                  {facilityOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <Icon icon="solar:alt-arrow-down-linear" width={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
              {errors.facility && <p className="text-red-600 text-xs font-semibold mt-1">{errors.facility}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Deskripsi Kerusakan</label>
              <textarea 
                className={`w-full bg-gray-100 border rounded-xl p-3 text-sm text-gray-700 h-32 resize-none ${errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                placeholder="Jelaskan detail kerusakan yang terjadi..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {errors.description && <p className="text-red-600 text-xs font-semibold mt-1">{errors.description}</p>}
            </div>
          </div>
        </div>

        {/* Step 3: Location */}
        <div>
          <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wide mb-3">Lokasi Terdeteksi (GPS)</h3>
          <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-200">
            <div className="h-48 bg-gray-100 rounded-xl relative overflow-hidden flex items-center justify-center z-0">
              <MapView 
                lat={coords.lat} 
                lng={coords.lng} 
                interactive={true} 
                onPositionChange={(lat, lng) => setCoords({ lat, lng })} 
              />
            </div>
            <div className="mt-3">
              <p className="font-bold text-gray-700 text-sm">Gedung Elektro, Lt. 2</p>
              <p className="text-[10px] text-gray-500 font-mono mt-1">
                {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
              </p>
              <button 
                type="button"
                className="text-xs font-bold text-gray-700 flex items-center gap-1 mt-3"
                onClick={() => setCoords({ lat: -7.0514, lng: 110.4371 })}
              >
                <Icon icon="solar:refresh-circle-bold" width={16} />
                Perbarui Lokasi
              </button>
            </div>
          </div>
        </div>

        {/* Priority Toggle */}
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="font-bold text-[#b45309] flex items-center gap-2 mb-1">
              <Icon icon="solar:danger-circle-bold" width={20} />
              Prioritas Darurat?
            </p>
            <p className="text-xs text-gray-600 pr-8">
              Aktifkan jika membutuhkan penanganan segera (bahaya keselamatan).
            </p>
          </div>
          
          {/* Custom Toggle */}
          <div 
            className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${priority ? 'bg-orange-500' : 'bg-gray-300'}`}
            onClick={() => setPriority(!priority)}
          >
            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${priority ? 'translate-x-6' : ''}`}></div>
          </div>
        </div>

        {/* Submit */}
        <button 
          className="w-full bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 mt-2"
          onClick={handleSubmit}
        >
          <Icon icon="solar:plain-bold" width={20} />
          Kirim Laporan
        </button>
      </div>

      <AlertModal 
        isOpen={showSuccessModal}
        type="success"
        title="Success"
        description={"Laporan berhasil Dikirim\nLaporan akan segera ditangani oleh petugas :)"}
        onContinue={() => {
          setShowSuccessModal(false);
          navigate('/home');
        }}
      />
    </div>
  );
}
