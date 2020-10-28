import { Entity } from './entity.model';

export class ContentType extends Entity {
  public properties: ContentTypeProperty[];
  public template: string;
}

export class ContentTypeProperty {
  public alias: string;
  public dataTypeAlias: string;
}
