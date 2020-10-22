import { FieldType } from './field-type.model';
import { Content } from './content.model';
import { ContentType } from './contentType.model';

export class Database {
  public contentType?: ContentType[];
  public content?: Content[];
  public fieldType?: FieldType[];
}
