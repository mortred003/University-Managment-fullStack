import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../service/department.service';
import { Department, Semester, Subject } from '../models/department.model';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'admin-departments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      @if (loading) {
        <p>Loading departments...</p>
      } @else if (error) {
        <p class="error">{{ error }}</p>
      } @else {
        @for (dept of departments; track dept.id) {
          <section class="department-card">
            <h2 (click)="dept.expanded = !dept.expanded" class="clickable">
              {{ dept.name }}
              <span>{{ dept.expanded ? '▲' : '▼' }}</span>
            </h2>

            @if (dept.expanded) {
              <div class="department-details">
                <p>{{ dept.description }}</p>

                @for (sem of dept.semesters; track sem.id) {
                  <section class="semester-card">
                    <h3 (click)="sem.expanded = !sem.expanded" class="clickable">
                      Semester {{ sem.semesterNo }} – {{ sem.academicYear }}
                      <span>{{ sem.expanded ? '▲' : '▼' }}</span>
                    </h3>

                    @if (sem.expanded) {
                      <div class="subjects-wrap">
                        @if (sem.subjects.length > 0) {
                          <table class="subject-table">
                            <thead>
                              <tr>
                                <th>Name</th><th>Description</th><th>Credits</th>
                                <th>Classroom</th><th>Time</th><th>Professor</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              @for (subj of sem.subjects; track subj.id) {
                                <tr>
                                  <td><input type="text"    [(ngModel)]="subj.name" /></td>
                                  <td><input type="text"    [(ngModel)]="subj.description" /></td>
                                  <td><input type="number"  [(ngModel)]="subj.credits" /></td>
                                  <td><input type="text"    [(ngModel)]="subj.classroom" /></td>
                                  <td><input type="text"    [(ngModel)]="subj.time" /></td>
                                  <td><input type="text"    [(ngModel)]="subj.professorName" /></td>
                                  <td>
                                    <select [(ngModel)]="subj.semesterId">
                                      @for (s of dept.semesters; track s.id) {
                                        <option [value]="s.id">
                                          Sem&nbsp;{{ s.semesterNo }} – {{ s.academicYear }}
                                        </option>
                                      }
                                    </select>
                                  </td>
                                  <td><button (click)="saveSubject(subj)">Save</button></td>
                                </tr>
                              }
                            </tbody>
                          </table>
                        } @else {
                          <p>No subjects for this semester.</p>
                        }
                      </div>
                    }
                  </section>
                } @empty {
                  <p>No semesters found.</p>
                }
              </div>
            }
          </section>
        } @empty {
          <p>No departments found.</p>
        }
      }
    </div>
  `,
  styles: [`
    .clickable { cursor: pointer; user-select: none; }
    .department-card, .semester-card {
      border: 1px solid #ccc;
      margin: 10px 0;
      padding: 10px;
      border-radius: 6px;
      background: #f9f9f9;
    }
    .subject-table input {
      width: 100%;
      box-sizing: border-box;
    }
    button {
      cursor: pointer;
      padding: 4px 8px;
      background: #0055cc;
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:hover {
      background: #003d99;
    }
    .error { color: red; }
  `]
})
export class AdminDepartmentsComponent implements OnInit {
  departments: Department[] = [];
  loading = true;
  error = '';

  constructor(private depSvc: DepartmentService) {}

  ngOnInit() {
    this.depSvc.getDepartments().subscribe({
      next: data => {
        this.departments = data.map(d => ({
          ...d,
          expanded: false,
          semesters: d.semesters.map(s => ({ ...s, expanded: false,
          subjects:s.subjects.map(subj => ({...subj, semesterId: s.id}))}))
        }));
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load departments';
        this.loading = false;
        console.error(err);
      }
    });
  }

  saveSubject(subject: Subject) {
    this.depSvc.updateSubject(subject).subscribe({
      next: updated => {
        alert(`Subject "${updated.name}" updated successfully!`);
      },
      error: err => {
        alert('Failed to update subject.');
        console.error(err);
      }
    });
  }

  protected readonly HTMLInputElement = HTMLInputElement;
  protected readonly event = event;
}
