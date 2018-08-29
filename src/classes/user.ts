export class UserItem {
  id: string;
  username: string;
  name: string;
  accountType: 'student'|'teacher';
}


export class UserInfo extends UserItem {
  joined_at: string;
}
