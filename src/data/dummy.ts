export type ReportStatus = 'Menunggu' | 'Diproses' | 'Selesai' | 'Ditolak';
export type Priority = 'Normal' | 'Darurat';

export interface TimelineState {
  status: 'Dilaporkan' | 'Diterima' | 'Ditugaskan' | 'Proses' | 'Selesai';
  date: string;
  isCompleted: boolean;
}

export interface Report {
  id: string;
  title: string;
  location: string;
  description: string;
  facility: string;
  status: ReportStatus;
  priority: Priority;
  date: string;
  time: string;
  reporter: string;
  reporterAvatar?: string;
  image?: string;
  rating?: number;
  reviewComment?: string;
  category: string;
  timeline?: TimelineState[];
  beforeImage?: string;
  afterImage?: string;
}

export interface StaffReport extends Report {
  assignedTo?: string;
}

export const dummyReports: Report[] = [
  {
    id: 'RPT-001',
    title: 'Monitor Berkedip - Lab Komputer 3',
    location: 'Gedung Elektro, Lt. 2',
    description: 'Monitor di mejar 12 sering mati mendadak saat digunakan praktikum.',
    facility: 'Lab Komputer',
    status: 'Diproses',
    priority: 'Normal',
    date: '12 Okt 2023',
    time: '09:45 WIB',
    reporter: 'Ahmad Fauzi',
    category: 'Komputer & Elektronik',
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=2070&auto=format&fit=crop',
    timeline: [
      { status: 'Dilaporkan', date: '12 Okt 2023', isCompleted: true },
      { status: 'Diterima', date: '12 Okt 2023', isCompleted: true },
      { status: 'Ditugaskan', date: '12 Okt 2023', isCompleted: true },
      { status: 'Proses', date: '12 Okt 2023', isCompleted: true },
      { status: 'Selesai', date: '', isCompleted: false },
    ]
  },
  {
    id: 'RPT-002',
    title: 'Monitor Berkedip - Lab Komputer 3',
    location: 'Gedung Elektro, Lt. 2',
    description: 'Monitor di mejar 12 sering mati mendadak saat digunakan praktikum.',
    facility: 'Lab Komputer',
    status: 'Selesai',
    priority: 'Normal',
    date: '12 Okt 2023',
    time: '09:45 WIB',
    reporter: 'Ahmad Fauzi',
    category: 'Komputer & Elektronik',
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=2070&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1644143923004-9c8ac1f4c41a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    afterImage: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 5,
    reviewComment: 'Mantap',
    timeline: [
      { status: 'Dilaporkan', date: '12 Okt 2023', isCompleted: true },
      { status: 'Diterima', date: '12 Okt 2023', isCompleted: true },
      { status: 'Ditugaskan', date: '12 Okt 2023', isCompleted: true },
      { status: 'Proses', date: '13 Okt 2023', isCompleted: true },
      { status: 'Selesai', date: '13 Okt 2023', isCompleted: true },
    ]
  },
  {
    id: 'RPT-003',
    title: 'AC Ruang MST 305 RUSAK',
    location: 'Gedung Magister Terapan',
    description: 'AC tidak mau nyala sama sekali padahal remote sudah dihidupkan.',
    facility: 'HVAC',
    status: 'Menunggu',
    priority: 'Normal',
    date: '2 jam yang lalu',
    time: '08:15 WIB',
    reporter: 'Budi Santoso',
    category: 'AC & Ventilasi',
    image: 'https://plus.unsplash.com/premium_photo-1679943423706-570c6462f9a4?q=80&w=705&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'RPT-004',
    title: 'AC Ruang MST 305 RUSAK',
    location: 'Gedung Magister Terapan',
    description: 'AC bocor.',
    facility: 'HVAC',
    status: 'Menunggu',
    priority: 'Normal',
    date: '2 jam yang lalu',
    time: '08:15 WIB',
    reporter: 'Budi Santoso',
    category: 'AC & Ventilasi',
    image: 'https://plus.unsplash.com/premium_photo-1679943423706-570c6462f9a4?q=80&w=705&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'RPT-005',
    title: 'AC Ruang MST 305 RUSAK',
    location: 'Gedung Magister Terapan',
    description: 'AC bau.',
    facility: 'HVAC',
    status: 'Menunggu',
    priority: 'Normal',
    date: '2 jam yang lalu',
    time: '08:15 WIB',
    reporter: 'Budi Santoso',
    category: 'AC & Ventilasi',
    image: 'https://plus.unsplash.com/premium_photo-1679943423706-570c6462f9a4?q=80&w=705&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export const facilityOptions = [
  'Pilih Fasilitas',
  'Lab Komputer',
  'Lab Kimia',
  'Lab Fisika',
  'Kamar Mandi / Toilet',
  'Kelas / Ruang Kuliah',
  'Kantin',
  'Perpustakaan',
  'Area Parkir',
  'Jaringan WiFi',
  'AC & Ventilasi',
  'Kelistrikan',
  'Pencahayaan',
  'Lain-lain',
];

export const buildingOptions = [
  { id: 'all', label: 'Semua', icon: 'solar:widget-bold' },
  { id: 'gkt', label: 'GKT', icon: 'solar:city-bold' },
  { id: 'sa', label: 'SA', icon: 'solar:home-2-bold' },
  { id: 'sb', label: 'SB', icon: 'solar:home-2-bold' },
  { id: 'mst', label: 'MST', icon: 'solar:city-bold' },
  { id: 'more', label: '...', icon: 'solar:menu-dots-bold' },
];

export const damageOptions = [
  { id: 'all', label: 'Semua', icon: 'solar:widget-bold' },
  { id: 'pc', label: 'PC', icon: 'solar:monitor-bold' },
  { id: 'jaringan', label: 'Jaringan', icon: 'material-symbols:wifi' },
  { id: 'kursi', label: 'Kursi', icon: 'solar:armchair-bold' },
  { id: 'ac', label: 'AC', icon: 'solar:archive-bold' }, // Using archive as approximation for AC
  { id: 'more', label: '...', icon: 'solar:menu-dots-bold' },
];


export const staffStats = {
  total: 8,
  waiting: 3,
  inProgress: 2,
  done: 1,
};

export const quickCategories = [
  { icon: 'Fasilitas', label: 'Fasilitas', count: 12, color: '#1e3a8a', iconName: 'solar:settings-linear' },
  { icon: 'Kelistrikan', label: 'Kelistrikan', count: 8, color: '#b91c1c', iconName: 'solar:lightbulb-linear' },
];
