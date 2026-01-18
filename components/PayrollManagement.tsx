
import React, { useState } from 'react';
import { MOCK_EMPLOYEES } from '../constants';

const PayrollManagement: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('June 2024');
  
  const generateSalary = (base: number, allowance: number, absentDays: number) => {
    const gross = base + allowance;
    const deduction = (base / 30) * absentDays;
    return { gross, deduction, net: gross - deduction };
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Payroll Processing</h2>
          <p className="text-slate-500 text-sm">Review and disburse salaries for the current billing cycle.</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>May 2024</option>
            <option>June 2024</option>
            <option>July 2024</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 transition-all">
            Run Auto-Payroll
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase">Employee</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase">Base + Allowance</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase">Absents (Deduction)</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase">Net Salary</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase">Status</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_EMPLOYEES.map(emp => {
              const absents = Math.floor(Math.random() * 3);
              const { gross, deduction, net } = generateSalary(emp.baseSalary, emp.allowance, absents);
              
              return (
                <tr key={emp.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                        <img src={emp.photo} alt={emp.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{emp.name}</p>
                        <p className="text-[10px] text-slate-500">{emp.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600">৳ {gross.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-rose-500 font-medium">{absents} Days (-৳ {deduction.toFixed(0)})</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">৳ {net.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold uppercase rounded tracking-wider">Unpaid</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-slate-400 hover:text-blue-500 text-sm font-semibold">
                        <i className="fas fa-file-pdf mr-1"></i> Payslip
                      </button>
                      <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded text-xs font-bold">
                        Pay Now
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Payment Disbursement Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Total Net Salary</span>
              <span className="font-bold">৳ 4,250,000</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Total Deductions</span>
              <span className="font-bold text-rose-500">৳ 120,500</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Number of Payments</span>
              <span className="font-bold">124 Employees</span>
            </div>
            <div className="h-[1px] bg-slate-100 my-2"></div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-900">Total Funds Needed</span>
              <span className="text-xl font-black text-blue-600">৳ 4,370,500</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 border border-slate-200 shadow-sm">
            <i className="fas fa-file-export text-xl"></i>
          </div>
          <h4 className="font-bold text-slate-800">Export Bank Disbursement File</h4>
          <p className="text-xs text-slate-500 max-w-[250px]">Generate a standard Excel file compatible with major Bangladeshi banks (City, EBL, BRAC) for bulk upload.</p>
          <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">Download .xlsx</button>
        </div>
      </div>
    </div>
  );
};

export default PayrollManagement;
