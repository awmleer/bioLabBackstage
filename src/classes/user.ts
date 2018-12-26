export class UserItem {
  id: number;
  username: string = '';
  name: string = ''; // changeable
  email: string = ''; // student changeable
  isAdmin: boolean = false; // changeable
  accountType: 'student'|'teacher' = 'student'; // changeable
  semester: string = ''; // changeable
  studentClass: string = ''; // changeable
  teacherName: string = ''; // changeable
}

export class UserInfo extends UserItem {
  joined_at: string;
}
