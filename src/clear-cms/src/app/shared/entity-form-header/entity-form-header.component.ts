import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-entity-form-header',
  templateUrl: './entity-form-header.component.html',
  styleUrls: ['./entity-form-header.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class EntityFormHeaderComponent implements OnInit {

  @Input() public formGroup: FormGroup;
  @Input() public parentAliases$: Observable<string>;

  constructor() { }

  ngOnInit(): void {
  }

}
