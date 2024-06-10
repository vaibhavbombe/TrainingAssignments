import { Request, Response } from 'express';
import { Shift } from '../models/shift';
import { v4 as uuidv4 } from 'uuid';

export const startShift = async (req: Request, res: Response) => {
  const employeeId = req.user.id;
  const newShift = await Shift.create({
    id: uuidv4(),
    employeeId,
    startTime: new Date(),
  });
  res.status(201).json(newShift);
};

export const endShift = async (req: Request, res: Response) => {
  const employeeId = req.user.id;
  const shift = await Shift.findOne({
    where: { employeeId, endTime: null },
  });

  if (!shift) {
    return res.status(404).json({ message: 'Active shift not found' });
  }

  shift.endTime = new Date();
  shift.actualHours = Shift.calculateActualHours(shift.startTime, shift.endTime);
  await shift.save();

  res.status(200).json(shift);
};
