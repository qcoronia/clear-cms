import { Entity } from './entity.model';

export class FieldType extends Entity {
  public type: 'string' | 'boolean' | 'number' | 'Date';
  public name: string;
}
