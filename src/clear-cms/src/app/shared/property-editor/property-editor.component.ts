import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataTypeService } from 'src/app/services/data-type/data-type.service';

@Component({
  selector: 'app-property-editor',
  templateUrl: './property-editor.component.html',
  styleUrls: ['./property-editor.component.scss']
})
export class PropertyEditorComponent implements OnInit {

  @Input() public isReadOnly: boolean;
  @Input() public dataTypeAlias: string;
  @Input() public value: string;

  public dataTypeAliases$: Observable<string[]>;

  constructor(private dataType: DataTypeService) {
    this.dataTypeAliases$ = this.dataType.store.all$.pipe(
      map(dataTypes => dataTypes.map(f => f.alias)),
    );
  }

  ngOnInit(): void {
  }

}
