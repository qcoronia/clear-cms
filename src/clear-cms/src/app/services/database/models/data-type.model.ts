import { Entity } from './entity.model';

export class DataType extends Entity {
  public type: 'string' | 'boolean' | 'number' | 'Date';
  public name: string;
}
