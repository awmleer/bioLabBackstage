export class NoticeBrief {
  id: number;
  time: string;
  title: string;
}

export class NoticeDetail extends NoticeBrief {
  content: string; // html
}
