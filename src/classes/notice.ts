export class NoticeBrief {
  id: number;
  time: string;
  title: string;
  starred: boolean;
}

export class NoticeDetail extends NoticeBrief {
  content: string; // html
}
