import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { dummyReports, staffStats, quickCategories } from '../data/dummy';
import type { Report } from '../data/dummy';
import BottomNav from '../components/BottomNav';

function StatusBadge({ status }: { status: Report['status'] }) {
  const map: Record<string, { cls: string; label: string }> = {
    Menunggu: { cls: 'badge-waiting', label: 'Menunggu' },
    Diproses: { cls: 'badge-process', label: 'Diproses' },
    Selesai: { cls: 'badge-done', label: 'Selesai' },
    Ditolak: { cls: 'badge-rejected', label: 'Ditolak' },
  };
  const s = map[status] || map.Menunggu;
  return <span className={`badge ${s.cls}`}>{s.label}</span>;
}

export default function StaffDashboard() {
  const navigate = useNavigate();
  const urgentReports = dummyReports.filter((r) => r.priority === 'Darurat');
  const recentReports = dummyReports.slice(0, 5);

  return (
    <div className="page-container">
      {/* Header */}
      <header className="staff-header">
        <div>
          <p className="header-greeting">Halo, Andin! 👋</p>
          <h2 className="header-title">Dashboard Petugas</h2>
          <p className="header-sub">Selamat datang kembali. Periksa laporan masuk.</p>
        </div>
        <button className="icon-btn" onClick={() => navigate('/notifications')}>
          <Icon icon="solar:bell-linear" width={22} height={22} />
          <span className="notif-dot" />
        </button>
      </header>

      <div className="page-body">
        {/* Stats cards */}
        <div className="stats-row">
          <div className="stat-card stat-blue">
            <div className="stat-num">{staffStats.total}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat-card stat-orange">
            <div className="stat-num">{staffStats.waiting}</div>
            <div className="stat-label">Menunggu</div>
          </div>
          <div className="stat-card stat-purple">
            <div className="stat-num">{staffStats.inProgress}</div>
            <div className="stat-label">Diproses</div>
          </div>
          <div className="stat-card stat-green">
            <div className="stat-num">{staffStats.done}</div>
            <div className="stat-label">Selesai</div>
          </div>
        </div>

        {/* Urgent Reports */}
        {urgentReports.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h3 className="section-title danger-text">
                <Icon icon="solar:danger-triangle-bold" width={18} /> TANGGAP DARURAT
              </h3>
              <span className="badge badge-danger">{urgentReports.length} AKTIF</span>
            </div>
            {urgentReports.map((r) => (
              <div
                key={r.id}
                className="urgent-card"
                onClick={() => navigate(`/staff/report/${r.id}`)}
              >
                <div className="urgent-icon">
                  <Icon icon="solar:fire-bold" width={22} color="#ef4444" />
                </div>
                <div className="urgent-info">
                  <p className="urgent-title">{r.title}</p>
                  <p className="urgent-loc">{r.location} • {r.time}</p>
                </div>
                <button className="btn-danger-sm">Tangani</button>
              </div>
            ))}
          </section>
        )}

        {/* Quick Categories */}
        <section className="section">
          <h3 className="section-title">Kategori Pintas</h3>
          <div className="category-grid">
            {quickCategories.map((cat) => (
              <div key={cat.label} className="category-card" style={{ '--cat-color': cat.color } as React.CSSProperties}>
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-count" style={{ color: cat.color }}>{cat.count}</span>
                <span className="cat-label">{cat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Reports */}
        <section className="section">
          <div className="section-header">
            <h3 className="section-title">Daftar Laporan Masuk</h3>
            <button className="link-btn" onClick={() => navigate('/staff/reports')}>
              Lihat Semua
            </button>
          </div>
          <div className="report-list">
            {recentReports.map((r) => (
              <div
                key={r.id}
                className="report-card"
                onClick={() => navigate(`/staff/report/${r.id}`)}
              >
                <div className="report-card-img">
                  <Icon icon="solar:buildings-3-bold-duotone" width={28} color="#6366f1" />
                </div>
                <div className="report-card-body">
                  <div className="report-card-top">
                    <span className="report-date">{r.date} • {r.time}</span>
                    <StatusBadge status={r.status} />
                  </div>
                  <p className="report-title">{r.title}</p>
                  <p className="report-loc">
                    <Icon icon="solar:map-point-wave-linear" width={13} />
                    {r.location}
                  </p>
                  <p className="report-desc">{r.description}</p>
                  {r.priority === 'Darurat' && (
                    <span className="badge badge-danger mt-4">🚨 Darurat</span>
                  )}
                  <div className="report-actions">
                    <button className="btn-sm btn-primary-sm" onClick={(e) => { e.stopPropagation(); }}>
                      Terima
                    </button>
                    <button className="btn-sm btn-outline-sm" onClick={(e) => { e.stopPropagation(); }}>
                      Tanggapi
                    </button>
                    <button className="btn-sm btn-ghost-sm" onClick={(e) => { e.stopPropagation(); }}>
                      Tolak
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="bottom-spacer" />
      </div>

      <BottomNav role="staff" />
    </div>
  );
}
