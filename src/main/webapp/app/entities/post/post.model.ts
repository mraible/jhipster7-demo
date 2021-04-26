import * as dayjs from 'dayjs';
import { IBlog } from 'app/entities/blog/blog.model';
import { ITag } from 'app/entities/tag/tag.model';

export interface IPost {
  id?: number;
  title?: string;
  content?: string;
  date?: dayjs.Dayjs;
  blog?: IBlog | null;
  tags?: ITag[] | null;
}

export class Post implements IPost {
  constructor(
    public id?: number,
    public title?: string,
    public content?: string,
    public date?: dayjs.Dayjs,
    public blog?: IBlog | null,
    public tags?: ITag[] | null
  ) {}
}

export function getPostIdentifier(post: IPost): number | undefined {
  return post.id;
}
