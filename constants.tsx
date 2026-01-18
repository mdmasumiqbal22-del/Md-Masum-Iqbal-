
import { Employee, EmploymentType, UserRole } from './types';

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'EMP001',
    name: 'Rahim Ahmed',
    photo: 'https://picsum.photos/seed/rahim/200',
    nid: '1234567890123',
    phone: '01711223344',
    address: 'Gulshan, Dhaka',
    department: 'Engineering',
    designation: 'Senior Developer',
    joiningDate: '2021-05-15',
    employmentType: EmploymentType.PERMANENT,
    baseSalary: 85000,
    allowance: 15000,
    otRate: 500
  },
  {
    id: 'EMP002',
    name: 'Sultana Razia',
    photo: 'https://picsum.photos/seed/sultana/200',
    nid: '9876543210987',
    phone: '01999887766',
    address: 'Mirpur, Dhaka',
    department: 'HR',
    designation: 'HR Manager',
    joiningDate: '2022-01-10',
    employmentType: EmploymentType.PERMANENT,
    baseSalary: 65000,
    allowance: 10000,
    otRate: 400
  },
  {
    id: 'EMP003',
    name: 'Kabir Hossain',
    photo: 'https://picsum.photos/seed/kabir/200',
    nid: '4567890123456',
    phone: '01511224455',
    address: 'Uttara, Dhaka',
    department: 'Operations',
    designation: 'Security Guard',
    joiningDate: '2023-03-01',
    employmentType: EmploymentType.GUARD,
    baseSalary: 18000,
    allowance: 2000,
    otRate: 150
  }
];

export const APP_THEME = {
  primary: '#0f172a', // Slate 900
  secondary: '#3b82f6', // Blue 500
  accent: '#f59e0b', // Amber 500
  background: '#f8fafc', // Slate 50
};
