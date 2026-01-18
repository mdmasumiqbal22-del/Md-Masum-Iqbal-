
export enum UserRole {
  ADMIN = 'ADMIN',
  HR = 'HR',
  ACCOUNTS = 'ACCOUNTS',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE'
}

export enum EmploymentType {
  PERMANENT = 'Permanent',
  CONTRACT = 'Contract',
  GUARD = 'Guard',
  DAILY_WORKER = 'Daily Worker'
}

export enum LeaveType {
  CASUAL = 'Casual',
  SICK = 'Sick',
  EARNED = 'Earned',
  WITHOUT_PAY = 'Without Pay'
}

export enum PaymentMethod {
  BANK = 'Bank Transfer',
  CASH = 'Cash',
  BKASH = 'bKash',
  NAGAD = 'Nagad'
}

export interface Employee {
  id: string;
  name: string;
  photo: string;
  nid: string;
  phone: string;
  address: string;
  department: string;
  designation: string;
  joiningDate: string;
  employmentType: EmploymentType;
  baseSalary: number;
  allowance: number;
  otRate: number;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'Late' | 'Absent' | 'Leave';
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  workingDays: number;
  presents: number;
  absents: number;
  overtimeHours: number;
  grossSalary: number;
  deductions: number;
  netSalary: number;
  status: 'Paid' | 'Unpaid' | 'Pending';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}
