import { Entity } from './entity.model';

export class ContentType extends Entity {
  public properties: { [key: string]: string };
  public template: string;
}
