import { Request, Response } from 'express';
import { Timesheet } from '../models/timesheet';
import { v4 as uuidv4 } from 'uuid';

export const createTimesheet = async (req: Request, res: Response) => {
  const { projectName, taskName, fromDate, toDate } = req.body;
  const employeeId = req.user.id;
  const shiftId = req.body.shiftId;

  try {
    const newTimesheet = await Timesheet.create({
      id: uuidv4(),
      employeeId,
      shiftId,
      projectName,
      taskName,
      fromDate,
      toDate,
    });

    res.status(201).json(newTimesheet);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
