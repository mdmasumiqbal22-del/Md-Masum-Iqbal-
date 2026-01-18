
import React, { useState } from 'react';
import { MOCK_EMPLOYEES } from '../constants';
import { Employee, EmploymentType } from '../types';

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    emp.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Employee Directory</h2>
          <p className="text-slate-500 text-sm">Manage staff profiles and salary structures.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-2"
          >
            <i className="fas fa-plus"></i>
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEmployees.map(emp => (
          <div key={emp.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative group">
            <div className="flex items-start justify-between mb-4">
              <img src={emp.photo} alt={emp.name} className="w-16 h-16 rounded-2xl object-cover" />
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-slate-400 hover:text-blue-500"><i className="fas fa-edit"></i></button>
                <button className="p-2 text-slate-400 hover:text-red-500"><i className="fas fa-trash"></i></button>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">{emp.name}</h3>
              <p className="text-blue-600 text-sm font-medium">{emp.designation}</p>
              <p className="text-slate-500 text-xs mb-4">{emp.department} • {emp.id}</p>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-50 p-2 rounded-lg">
                  <p className="text-[10px] uppercase text-slate-400 font-bold">Joining Date</p>
                  <p className="text-xs font-semibold text-slate-700">{emp.joiningDate}</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg">
                  <p className="text-[10px] uppercase text-slate-400 font-bold">Type</p>
                  <p className="text-xs font-semibold text-slate-700">{emp.employmentType}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <p className="text-[10px] uppercase text-slate-400 font-bold">Monthly Gross</p>
                  <p className="font-bold text-slate-900">৳ {(emp.baseSalary + emp.allowance).toLocaleString()}</p>
                </div>
                <button className="text-blue-600 text-sm font-semibold hover:underline">View Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">New Employee Registration</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><i className="fas fa-times"></i></button>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
              {/* Form fields */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Arif Ahmed" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Employee ID</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. EMP123" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Department</label>
                <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Engineering</option>
                  <option>HR</option>
                  <option>Sales</option>
                  <option>Accounts</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Base Salary (BDT)</label>
                <input type="number" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              {/* More fields as per requirement... */}
            </div>
            <div className="p-6 border-t border-slate-100 flex justify-end space-x-4 bg-slate-50">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-slate-600 font-semibold hover:bg-slate-200 rounded-xl">Cancel</button>
              <button className="px-6 py-2 bg-blue-600 text-white font-bold hover:bg-blue-700 rounded-xl transition-all">Save Employee</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;
