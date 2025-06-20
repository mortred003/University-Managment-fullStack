import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department,Subject } from '../models/department.model';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private base = '/api/departments';

  constructor(private http: HttpClient) {}


  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.base);
  }


  getDepartment(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.base}/${id}`);
  }
  updateSubject(subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(`/api/subjects/${subject.id}`, subject);
  }
}
