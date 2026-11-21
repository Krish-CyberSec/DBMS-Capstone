import React, { useEffect, useState } from 'react';
import {
  Users,
  Package,
  FolderTree,
  ShoppingCart,
  IndianRupee,
  CreditCard,
  Clock,
  Ban,
  AlertTriangle,
  Repeat,
  RefreshCw,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { api } from '../services/api';
import { StatCard } from '../components/StatCard';
import { DashboardKPI } from '../types';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

export const Overview: React.FC = () => {
  const [kpi, setKpi] = useState<DashboardKPI | null>(null);
  const [charts, setCharts] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const data = await api.getDashboardAnalytics();
      setKpi(data.kpi);
      setCharts(data.charts);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-blue-950 p-6 rounded-2xl text-white shadow-md">
        <div>
          <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            Live MySQL 8.4 Database Analytics
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mt-2 tracking-tight">
            E-Commerce Order & Customer Analytics Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            All metrics, chart aggregations, and performance counters are computed in real time from SQL
            queries executing directly against the normalized database.
          </p>
        </div>

        <button
          onClick={fetchDashboardData}
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold shadow-md transition-all self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Customers"
          value={kpi?.totalCustomers ?? '—'}
          subtitle={`${kpi?.repeatCustomers ?? 0} repeat buyers`}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Total Products"
          value={kpi?.totalProducts ?? '—'}
          subtitle={`Across ${kpi?.totalCategories ?? 0} categories`}
          icon={Package}
          color="indigo"
        />
        <StatCard
          title="Total Orders"
          value={kpi?.totalOrders ?? '—'}
          subtitle={`${kpi?.pendingOrders ?? 0} pending`}
          icon={ShoppingCart}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={kpi ? `₹${Number(kpi.totalRevenue).toLocaleString()}` : '—'}
          subtitle="Non-cancelled orders"
          icon={IndianRupee}
          color="emerald"
        />
        <StatCard
          title="Successful Paid"
          value={kpi ? `₹${Number(kpi.totalSuccessfulPayments).toLocaleString()}` : '—'}
          subtitle={`${kpi?.successfulPaymentsCount ?? 0} paid attempts`}
          icon={CreditCard}
          color="emerald"
        />
      </div>

      {/* Secondary Status Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
          <div className="p-2.5 bg-amber-50 rounded-lg text-amber-600 border border-amber-100">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Pending Orders</p>
            <p className="text-lg font-bold text-slate-800">{kpi?.pendingOrders ?? 0}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
          <div className="p-2.5 bg-rose-50 rounded-lg text-rose-600 border border-rose-100">
            <Ban className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Cancelled Orders</p>
            <p className="text-lg font-bold text-slate-800">{kpi?.cancelledOrders ?? 0}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
          <div className="p-2.5 bg-amber-50 rounded-lg text-amber-600 border border-amber-100">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Low Stock Items</p>
            <p className="text-lg font-bold text-slate-800">{kpi?.lowStockProducts ?? 0}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
          <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600 border border-blue-100">
            <Repeat className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Repeat Customers</p>
            <p className="text-lg font-bold text-slate-800">{kpi?.repeatCustomers ?? 0}</p>
          </div>
        </div>
      </div>

      {/* Row 1 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Over Time */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Revenue Over Time</h3>
              <p className="text-xs text-slate-400">Daily sales aggregation from valid orders</p>
            </div>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts?.revenueOverTime || []}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="order_date" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <Tooltip
                  formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, 'Daily Revenue']}
                  contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="daily_revenue" stroke="#2563eb" strokeWidth={2} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders by Status */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Orders Distribution by Status</h3>
              <p className="text-xs text-slate-400">Order lifecycle state breakdown</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts?.ordersByStatus || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="status" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <Tooltip
                  formatter={(val: any) => [val, 'Orders Count']}
                  contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Best Selling Products */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Best-Selling Products by Revenue & Units</h3>
              <p className="text-xs text-slate-400">Top catalog items ranked by cumulative volume</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={charts?.bestSellers || []}
                layout="vertical"
                margin={{ left: 20, right: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis dataKey="product_name" type="category" tick={{ fontSize: 11 }} stroke="#94a3b8" width={130} />
                <Tooltip
                  formatter={(val: any, name: any) => [
                    name === 'revenue' ? `₹${Number(val).toLocaleString()}` : val,
                    name === 'revenue' ? 'Revenue' : 'Units Sold',
                  ]}
                  contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="revenue" fill="#10b981" radius={[0, 4, 4, 0]} />
                <Bar dataKey="units_sold" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Cohort Segmentation (vw_customer_type) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Customer Segmentation</h3>
              <p className="text-xs text-slate-400">From View `vw_customer_type`</p>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts?.customerSegments || []}
                  dataKey="count"
                  nameKey="customer_type"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={45}
                  paddingAngle={4}
                  label={({ name, percent }: any) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {(charts?.customerSegments || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any, name: any) => [`${val} Customers`, name]}
                  contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Overview;
