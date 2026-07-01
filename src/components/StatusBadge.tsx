import type { ReportStatus } from '../data/dummy';

export default function StatusBadge({ status }: { status: ReportStatus }) {
  const map: Record<string, string> = {
    Menunggu: 'bg-yellow-200 text-yellow-800',
    Diproses: 'bg-orange-200 text-orange-800',
    Selesai: 'bg-green-200 text-green-800',
    Ditolak: 'bg-gray-200 text-gray-800',
  };
  return (
    <span className={`px-2 py-1 text-[10px] font-bold rounded-md ${map[status] || map.Menunggu}`}>
      {status}
    </span>
  );
}
