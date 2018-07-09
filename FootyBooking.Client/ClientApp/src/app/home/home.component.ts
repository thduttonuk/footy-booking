import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { AddedToGameComponent } from '../popups/added-to-game/added-to-game.component';

export interface PeriodicElement {
  name: string;
  position: number;
  paid: boolean;
  team: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  displayedColumns: string[] = ['name', 'team', 'paid'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  options: FormGroup;
  added = false;

  constructor(fb: FormBuilder, public snackBar: MatSnackBar) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      name: ['', Validators.required],
      paid: false,
      team: 0
    });
  } 

  public onSubmit() {
    ELEMENT_DATA.push({
      position: 1,
      name: this.options.get("name").value,
      paid: this.options.get("paid").value,
      team: 0
    } as PeriodicElement);

    this.dataSource.data = ELEMENT_DATA;

    this.added = true;

    this.snackBar.openFromComponent(AddedToGameComponent, {
      duration: 5000      
    });
  }

  public paidChanged(element) {
    this.snackBar.openFromComponent(AddedToGameComponent, {
      duration: 5000      
    });
  }
}
