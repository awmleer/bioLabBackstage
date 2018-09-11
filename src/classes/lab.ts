export class Lab {
  id: number;
  code: string;
  capacity: number;
  description: string;
}

export class Reservation {
  id: number;
  startTime: number;
  endTime: number;
  applier: UserItem;
  approver?: UserItem;
  status: 'init' | 'approved' | 'rejected';
  description: string;
}
