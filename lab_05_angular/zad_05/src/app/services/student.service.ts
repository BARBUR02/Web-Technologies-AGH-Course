import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { count, Observable } from 'rxjs';
import { Student } from '../students/student';
// import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentsRef: AngularFireList<Student>
  studentRef: AngularFireObject<Student>;
 
  constructor(private angularDB : AngularFirestore) {
  }

  createStudent(student: Student){
    // return new Promise<Student>((resolve,reject)=>{
    //   this.angularDB
    //   .collection('students')
    //   .add({...student})
    //   .then(response => {
    //     console.log("Test response")
    //     console.log(response)},
    //   error => reject(error));
    // });
    this.angularDB
      .collection('students')
      .add({...student})
  }

  updateStudent(key: string, value: Student) {
    this.angularDB.collection('students').doc(key).update
    ({
      ... value
    })
  }

  deleteStudent(key: string) {
    return this.angularDB.collection('students')
    .doc(key).delete()
  }

  getStudentsList()  {
    return this.angularDB
    .collection('students')
    .snapshotChanges()
  }

   deleteAll() {
    const daneRef= this.angularDB.collection('students')
  }
    
}
