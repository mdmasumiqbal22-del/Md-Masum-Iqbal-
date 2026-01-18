
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { getPayrollInsights } from '../services/geminiService';

const MOCK_DATA = [
  { name: 'Jan', amount: 450000 },
  { name: 'Feb', amount: 452000 },
  { name: 'Mar', amount: 480000 },
  { name: 'Apr', amount: 620000 }, // Bonus month?
  { name: 'May', amount: 475000 },
  { name: 'Jun', amount: 490000 },
];

const Dashboard: React.FC = () => {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoadingInsight(true);
      const insight = await getPayrollInsights(MOCK_DATA);
      setAiInsight(insight || null);
      setLoadingInsight(false);
    };
    fetchInsight();
  }, []);

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Employees', value: '124', icon: 'fa-users', color: 'blue' },
          { label: 'Monthly Payroll', value: '৳ 4.9M', icon: 'fa-money-bill-wave', color: 'emerald' },
          { label: 'On Leave Today', value: '8', icon: 'fa-user-clock', color: 'amber' },
          { label: 'Late Attendance', value: '12%', icon: 'fa-clock', color: 'rose' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600`}>
              <i className={`fas ${stat.icon} text-xl`}></i>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Salary Disbursement Trend</h3>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Year 2024</option>
              <option>Year 2023</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_DATA}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`৳ ${value}`, 'Amount']}
                />
                <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Sidebar */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <i className="fas fa-robot text-blue-400"></i>
            </div>
            <h3 className="text-lg font-bold">AI Cost Insights</h3>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {loadingInsight ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 text-sm italic">Analyzing organizational data...</p>
              </div>
            ) : (
              <div className="prose prose-invert prose-sm">
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {aiInsight || "No insights available."}
                </p>
              </div>
            )}
          </div>
          <button 
            onClick={() => {}} 
            className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-semibold transition-all border border-white/10"
          >
            Refresh Analysis
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Recent Attendance Logs</h3>
          <button className="text-blue-500 text-sm font-semibold hover:underline">View All</button>
        </div>
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Time In</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Time Out</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { name: 'Arif Khan', in: '09:05 AM', out: '---', status: 'Present' },
              { name: 'Nusrat Jahan', in: '09:45 AM', out: '---', status: 'Late' },
              { name: 'Tanvir Hossain', in: '---', out: '---', status: 'Absent' },
              { name: 'Momena Akter', in: '08:55 AM', out: '---', status: 'Present' },
            ].map((log, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{log.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{log.in}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{log.out}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    log.status === 'Present' ? 'bg-emerald-100 text-emerald-700' : 
                    log.status === 'Late' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
