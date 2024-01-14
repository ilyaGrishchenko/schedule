import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NgFor, NgIf, NgClass } from "@angular/common";
import { HotTableModule } from '@handsontable/angular';

import { DatesService } from "../../services/dates.service";
import { PersonalService } from "../../services/personal.service";
import { ButtonService } from "../../services/button.service";

import Handsontable from 'handsontable';
import { Personal } from "../../interfaces/personal";
import { Button } from "../../interfaces/button";
import { Project } from "../../interfaces/project";
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  imports: [
    MatTableModule,
    HotTableModule,
    NgFor,
    NgIf,
    NgClass
  ],
  standalone: true
})

export class ScheduleComponent {
  dates: string[] = [];
  values: any[] = [];
  types: any[] = [];
  personal: Personal[] = [];
  buttons: any = {};
  rowHeaders: string[] = [];
  projects: Project[] = [];

  selectionMode: any = 'range';
  table: any = '';

  letterRenderer = 'letterRenderer';

  constructor(
    private datesService: DatesService,
    private personalService: PersonalService,
    private buttonService: ButtonService,
    private projectService: ProjectService
  ) { }

  public ngOnInit()
  {
    this.loadProjects();
    this.loadButtons();
    this.loadPersonal();
  }

  public loadDates() {
    this.datesService.getDates()
      .subscribe(dates => {
        this.dates = dates;
      });
  }

  public loadPersonal() {
    this.personalService.getData()
      .subscribe(personal => {
        this.personal = personal;
        this.rowHeaders = this.personal.map(item => item.name);
        this.loadTable();
      });
  }

  public loadButtons() {
    this.buttonService.getData()
      .subscribe(buttons => {
        this.buttons = buttons;
        this.prepareStyles();
        this.prepareRenderers();
      });
  }

  public loadProjects() {
    this.projectService.getData()
      .subscribe(projects => this.projects = projects);
  }

  public prepareRenderers() {
    Handsontable.renderers.registerRenderer(
      this.letterRenderer,
      (hotInstance, td, row, col, prop, value, cellProperties) => {
        Handsontable.renderers.TextRenderer(hotInstance, td, row, col, prop, value, cellProperties);

        if (this.types[value]) {
          td.className = this.types[value];
        }
      }
    );
  }

  public prepareStyles() {
    for (let i in this.buttons) {
      for (let button of this.buttons[i]) {
        this.types[button['letter']] = button['type'];
      }
    }

    for (let i in this.projects) {
      let project: Project = this.projects[i];
      console.log(project);
      // this.types[project.letter] = 'green-button';
    }
  }

  public loadTable() {
    let selector: any = '';

    this.personal.map(item => {
      let personalValues: any = [];
      for (let i in item.dates) {
        let date: any = item.dates[i];
        personalValues.push(date[1]);
        if (!this.dates.includes(date[0])) {
          this.dates.push(date[0]);
        }
      }
      this.values.push(personalValues);
    });

    let options = { ...{ data: this.values }, ...this.settings() };

    selector = document.querySelector<HTMLDivElement>('#personal-table');

    this.table = new Handsontable(selector, options);
  }

  public clearSelected() {
    this.saveLetters('', '');
  }

  public getSelected(letter: string, style: string) {
    this.saveLetters(letter, style)
  }

  protected saveLetters(value: string, className: string = '') {
    let selected = this.table.getSelected() || [];

    this.table.suspendRender();

    for (let index = 0; index < selected.length; index += 1) {
      const [row1, column1, row2, column2] = selected[index];
      const startRow = Math.max(Math.min(row1, row2), 0);
      const endRow = Math.max(row1, row2);
      const startCol = Math.max(Math.min(column1, column2), 0);
      const endCol = Math.max(column1, column2);

      for (let rowIndex = startRow; rowIndex <= endRow; rowIndex += 1) {
        for (let columnIndex = startCol; columnIndex <= endCol; columnIndex += 1) {
          this.table.setDataAtCell(rowIndex, columnIndex, value);
          this.table.setCellMeta(rowIndex, columnIndex, 'className', '');
          this.table.setCellMeta(rowIndex, columnIndex, 'className', className);

          this.personal[rowIndex].dates[columnIndex] = [ this.dates[columnIndex], value ];
        }
      }
    }

    this.personalService.saveData(this.personal).subscribe();

    this.table.render();
    this.table.resumeRender();
  }

  protected settings() {
    return {
      width: '100%',
      height: 'auto',
      colHeaders: this.dates,
      rowHeaders: this.rowHeaders,
      fixedColumnsStart: 1,
      editor: false,
      autoWrapCol: true,
      autoWrapRow: true,
      fillHandle: false,
      selectionMode: this.selectionMode,
      licenseKey: "non-commercial-and-evaluation",
      outsideClickDeselects: false,
      cells(row: number, col: number) {
        return { renderer: 'letterRenderer' };
      }
    };
  }
}
