import { Entity } from './entity.model';

export class DataType extends Entity {
  public type: 'string' | 'boolean' | 'number' | 'Date';
  public name: string;
  public editor: TextEditorType | BooleanEditorType | NumberEditorType | DateEditorType;
}

export type TextEditorType = 'text' | 'textarea' | 'color' | 'email' | 'tel' | 'url';

export type BooleanEditorType = 'checkbox';

export type NumberEditorType = 'number';

export type DateEditorType = 'date' | 'month' | 'week' | 'time';
