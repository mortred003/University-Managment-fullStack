export interface Subject {
  id: number;
  name: string;
  description: string;
  credits: number;
  classroom: string;
  time: string;
  profName?: string;
  professorName?: string;
  semesterId?: number;
}

export interface Semester {
  id: number;
  semesterNo: number;
  academicYear: string;
  subjects: Subject[];
  expanded?: boolean;
}

export interface Department {
  id: number;
  name: string;
  description: string;
  semesters: Semester[];
  expanded?: boolean;
}
