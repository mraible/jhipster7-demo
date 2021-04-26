import { IPost } from 'app/entities/post/post.model';

export interface ITag {
  id?: number;
  name?: string;
  entries?: IPost[] | null;
}

export class Tag implements ITag {
  constructor(public id?: number, public name?: string, public entries?: IPost[] | null) {}
}

export function getTagIdentifier(tag: ITag): number | undefined {
  return tag.id;
}
