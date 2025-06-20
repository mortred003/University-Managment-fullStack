import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Department, Semester } from '../models/department.model';
import { DepartmentService } from '../service/department.service';
import {
  trigger, state, style, animate, transition
} from '@angular/animations';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
  animations: [
    trigger('deptExpand', [
      state('closed', style({ transform: 'scale(1)', opacity: .85 })),
      state('open',   style({ transform: 'scale(1.02)', opacity: 1 })),
      transition('closed <=> open', animate('250ms ease'))
    ]),
    trigger('semExpand', [
      state('closed', style({
        height: '0',
        opacity: 0,
        padding: '0',
        pointerEvents: 'none'
      })),
      state('open', style({
        height: '*',
        opacity: 1,
        padding: '1rem',
        pointerEvents: 'auto'
      })),
      transition('closed <=> open', animate('250ms ease'))
    ])
  ]
})
export class DepartmentsComponent implements OnInit {

  departments: (Department & { expanded?: boolean })[] = [];
  loading = true; error?: string;

  constructor(private depSvc: DepartmentService) {}
  ngOnInit(): void {
    this.depSvc.getDepartments().subscribe({
      next: data => {
        this.departments = data.map(d => ({
          ...d,
          expanded: false,                        // departmemt
          semesters: (d.semesters ?? []).map(s => ({
            ...s,
            expanded: false                       // semester flag
          }))
        }));
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load departments';
        console.error(err);
        this.loading = false;
      }
    });
  }

  toggleDept(d: any) { d.expanded = !d.expanded; }
  toggleSem(s: Semester & {expanded?:boolean}, e: Event) {
    e.stopPropagation();
    s.expanded = !s.expanded;
  }
}
