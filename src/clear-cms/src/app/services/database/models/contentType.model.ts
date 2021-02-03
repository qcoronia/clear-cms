import { Entity } from './entity.model';

export class ContentType extends Entity {
  public properties: ContentTypeProperty[];
  public templateAlias?: string;
  public templateMapping?: TemplateMapping[];
}

export class ContentTypeProperty {
  public alias: string;
  public dataTypeAlias: string;
}

export class TemplateMapping {
  public slot: string;
  public propertyAlias: string;
}
