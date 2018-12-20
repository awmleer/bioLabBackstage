export class UserItem {
  id: number;
  username: string;
  name: string;
  accountType: 'student'|'teacher' = 'student';
}


export class UserInfo extends UserItem {
  joined_at: string;
}
