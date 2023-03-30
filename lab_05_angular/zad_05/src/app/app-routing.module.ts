import { CreateStudentComponent } from './students/create-student/create-student.component';
import { StudentsListComponent } from './students/students-list/students-list.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentUpdateComponent } from './students/student-update/student-update.component';

const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentsListComponent },
  { path: 'add', component: CreateStudentComponent },
  { path: 'update', component: StudentUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
