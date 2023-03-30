import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Student } from "../students/student";

@Injectable({
  providedIn: 'root'
})
export class UpdateService{
    studentClicked = new Subject<Student>();
    studentHelp = new Student();

    studentToUpdate(student: Student){
        this.studentClicked.next(student);
        this.studentHelp = student;
    }

    constructor(){}
}