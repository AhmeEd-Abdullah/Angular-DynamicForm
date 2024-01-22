import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  schoolForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.schoolForm = this.createFormItem('init');
  }

  // Get School Rooms
  getSchoolRooms(): FormArray {
    return this.schoolForm.get('schoolRooms') as FormArray;
  }

  // Add School Room
  addSchoolRoom() {
    this.getSchoolRooms().push(this.createFormItem('room'));
  }

  // Delete School Room
  deleteSchoolRoom(roomIndex: number) {
    this.getSchoolRooms().removeAt(roomIndex);
  }

  // Get Room Subjects
  getRoomSubjects(roomIndex: number): FormArray {
    return this.getSchoolRooms().at(roomIndex).get('roomSubjects') as FormArray;
  }

  // Add Room Subject
  AddRoomSubject(roomIndex: number) {
    this.getRoomSubjects(roomIndex).push(this.createFormItem('subject'));
  }

  // Delete Room Subject
  deleteRoomSubject(roomIndex: number, subjectIndex: number) {
    this.getRoomSubjects(roomIndex).removeAt(subjectIndex);
  }

  createFormItem(param: string): FormGroup {
    let myForm!: FormGroup;
    switch (param) {
      case 'init':
        myForm = this.fb.group({
          schoolName: '',
          schoolStudentsCount: '',
          schoolRooms: this.fb.array([]),
        });
        break;
      case 'room':
        myForm = this.fb.group({
          roomNumber: '',
          roomStudentsCount: '',
          roomSubjects: this.fb.array([]),
        });
        break;
      case 'subject':
        myForm = this.fb.group({
          subjectName: '',
          subjectStudentsCount: '',
        });
        break;
    }
    return myForm;
  }
}
