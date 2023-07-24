import httpStatus from 'http-status';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBooking(userId);
    return res.status(httpStatus.OK).send({
      id: booking.id,
      Room: booking.Room,
    });
  } catch (error) {
    next(error);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { roomId } = req.body as Record<string, number>;

  try {
    const booking = await bookingService.getRoomId(userId, Number(roomId));

    return res.status(httpStatus.OK).send({
      bookingId: booking.id,
    });
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function changeBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const bookingId = Number(req.params.bookingId);

  if (!bookingId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const { roomId } = req.body as Record<string, number>;
    const booking = await bookingService.switchRoomsId(userId, roomId);

    return res.status(httpStatus.OK).send({
      bookingId: booking.id,
    });
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
