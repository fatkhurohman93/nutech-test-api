import { Response, Request, NextFunction } from 'express';
import * as User from '@services/user.service';
import { Users, FindAllParams, ARCHIVING_STATUS } from '@interfaces/index';

export const FindAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params: FindAllParams = req.body;

  const result = await User.findAll(params);

  res.status(200).json({ message: 'Success', data: result });
};

export const FindOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName } = req.params;

  const result = await User.findOne(userName);

  res.status(200).json({ message: 'Success', data: result });
};

export const Update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body as Users;
  const { userName } = req.params;
  const whoIsAccess = req.headers.userName as string;

  const result = await User.update(data, whoIsAccess, userName);

  res.status(200).json({ message: 'Success', data: result });
};

export const UpdatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { oldPassword, newPassword, userName }: Users = req.body;

  const result = await User.updatePassword(oldPassword, newPassword, userName);

  res.status(200).json({ message: 'Success', data: result });
};

export const Archived = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName } = req.params;
  const whoIsAccess = req.headers.userName as string;

  const result = await User.archivedAndUnarchived(
    whoIsAccess,
    userName,
    ARCHIVING_STATUS.archived
  );

  res.status(200).json({ message: 'Success', data: result });
};

export const Unarchived = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName } = req.params;
  const whoIsAccess = req.headers.userName as string;

  const result = await User.archivedAndUnarchived(
    whoIsAccess,
    userName,
    ARCHIVING_STATUS.unarchived
  );

  res.status(200).json({ message: 'Success', data: result });
};

export const Destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName } = req.params;

  const result = await User.destroy(userName);

  res
    .status(200)
    .json({
      message: 'Success',
      data: `${result} data ${
        result > 1 ? 'has' : 'have'
      } been deleted successfully.`,
    });
};
