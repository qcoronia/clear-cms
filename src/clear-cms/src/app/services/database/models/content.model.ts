import { Entity } from './entity.model';

export class Content extends Entity {
  public title: string;
  public urlFragment: string;
  public contentTypeAlias: string;
  public properties: { [key: string]: any };
}
