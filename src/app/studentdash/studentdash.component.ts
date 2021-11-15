import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StudentDashModel } from './studentdash.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-studentdash',
  templateUrl: './studentdash.component.html',
  styleUrls: ['./studentdash.component.css']
})
export class StudentdashComponent implements OnInit {
  formValue!: FormGroup
  studentModelObj : StudentDashModel = new StudentDashModel();

  showAdd !:boolean;
  showUpdate !: boolean;
  studentAll:any;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      fees: [''],
    })
    this.getAllStudents()
  }

  clickAddStudent(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postStudentDetails(){
    this.studentModelObj.firstName = this.formValue.value.firstName;
    this.studentModelObj.lastName = this.formValue.value.lastName;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.mobile = this.formValue.value.mobile;
    this.studentModelObj.fees = this.formValue.value.fees;

    this.api.postStudent(this.studentModelObj).subscribe((res: any) => {
      console.log(res);
      alert("student record added successfully !")
      this.getAllStudents();
      this.formValue.reset();
    },
      (      err: any) => {
        alert("something went wrong !!!")
      })
  }

  getAllStudents(){
    this.api.getStudents().subscribe((res: any)=>{
      this.studentAll = res;
    })
  }

  deleteStudents(data:any){
    console.log(data.id)
    this.api.deleteStudent(data.id).subscribe((res:any)=>{
      alert("Record deleted successfull");
      this.getAllStudents();
    })
  }


  onEdit(data:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.studentModelObj.id= data.id;
    this.formValue.controls['firstName'].setValue(data.firstName);
    this.formValue.controls['lastName'].setValue(data.lastName);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['fees'].setValue(data.fees);
  }
  updateStudentDetails(){
    this.studentModelObj.firstName = this.formValue.value.firstName;
    this.studentModelObj.lastName = this.formValue.value.lastName;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.mobile = this.formValue.value.mobile;
    this.studentModelObj.fees = this.formValue.value.fees;
    this.api.updateStudent(this.studentModelObj,this.studentModelObj.id).subscribe(res=>{
      alert("Record updated successfully");
      this.formValue.reset();
      this.getAllStudents();
    })
  }
}


