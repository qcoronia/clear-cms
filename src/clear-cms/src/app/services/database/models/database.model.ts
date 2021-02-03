import { DataType } from './data-type.model';
import { Content } from './content.model';
import { ContentType } from './contentType.model';
import { Template } from './template.model';

export class Database {
  public contentType?: ContentType[];
  public content?: Content[];
  public dataType?: DataType[];
  public template?: Template[];
}
