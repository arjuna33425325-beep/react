import BackButton from '../components/BackButton';
import Header from '../components/Header';

export default function ProfilePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f0ece9] flex flex-col p-6">
        <BackButton className="mt-4" />

        <div className="flex flex-col items-center mt-6 rounded-xl shadow-xl p-3">
          <img
            src="https://i.pravatar.cc/300?u=a042581f4e29026024d"
            alt="Profile"
            className="w-48 h-48 rounded-full border-4 border-white/50 object-cover shadow-sm mb-6" />

          <h2 className="text-3xl font-bold text-[#1e58b3] text-center leading-tight mb-2">
            IKFINA ARZAQI<br />NAFI'AH
          </h2>
          <p className="text-gray-600 text-lg mb-8">Mahasiswa Angkatan 2025</p>

          <div className="w-full max-w-sm h-px bg-gray-400 mb-8"></div>

          <div className="w-full max-w-sm flex flex-col gap-6 text-left">
            <div>
              <p className="text-gray-600 text-sm mb-1">Nomor Induk Mahasiswa (NIM)</p>
              <p className="font-medium text-lg">3.34.25.3.10</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-1">Hak Akses / Role</p>
              <div className="bg-gray-200 inline-block px-4 py-1.5 rounded-full">
                <p className="font-bold text-[#1e58b3] text-sm">Mahasiswa</p>
              </div>
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-1">Status Akun</p>
              <p className="font-bold text-green-700 text-lg">Aktif</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-1">Email Institusi</p>
              <p className="font-bold text-[#1e58b3] text-lg break-all">fina.33425310@mhs.polines.ac.id</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-1">Jurusan</p>
              <p className="font-medium text-lg">Teknik Elektro</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-1">Program Studi</p>
              <p className="font-medium text-lg">Teknik Informatika</p>
            </div>
          </div>
        </div>
      </div></>
  );
}
