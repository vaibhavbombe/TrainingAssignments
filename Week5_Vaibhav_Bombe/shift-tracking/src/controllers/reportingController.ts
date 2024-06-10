import { Request, Response } from 'express';
import { Employee } from '../models/employee';
import { Shift } from '../models/shift';
import ExcelJS from 'exceljs';

export const generateReport = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.findAll({
      include: [{
        model: Shift,
        required: true,
      }],
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employee Shift Report');

    worksheet.columns = [
      { header: 'Employee Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Assigned Shift Hours', key: 'assignedShiftHours', width: 20 },
      { header: 'Actual Hours Worked', key: 'actualHours', width: 20 },
      { header: 'Shift Date', key: 'shiftDate', width: 20 },
    ];

    employees.forEach(employee => {
      employee.Shifts.forEach(shift => {
        worksheet.addRow({
          name: employee.name,
          email: employee.email,
          assignedShiftHours: employee.assignedShiftHours,
          actualHours: shift.actualHours,
          shiftDate: shift.startTime.toDateString(),
        });
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader('Content-Disposition', 'attachment; filename="report.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
