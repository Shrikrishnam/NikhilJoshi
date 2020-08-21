import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Package } from '../Utils/Package';
import Utils from '../Utils/utils';
@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
})
export class ViewAppointmentComponent implements OnInit {
  friends: object = [];
  editForm: FormGroup;
  packages = null;
  obj: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.getfitness();
  }

  ngOnInit() {
    this.packages = Utils.packages;
    this.editForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(60)]],
      email: ['', [Validators.required, Validators.email]],
      streetaddress: ['', Validators.required],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      state: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      country: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      pincode: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern(new RegExp('[0-9][0-9][0-9][0-9][0-9][0-9]')),
        ],
      ],

      phonenumber: ['', [Validators.required]],
      paisa: ['', [Validators.required]],
      inr: ['', [Validators.required]],
      packages: ['', Validators.required],
      trainerpreference: ['', Validators.required],
      physiotherapist: ['', Validators.required],
    });
    this.editForm.controls['packages'].valueChanges.subscribe((value) =>
      this.editForm.patchValue({
        inr: value,
        paisa: value * 100,
      })
    );
  }
  deleteAppointment(index, id) {
    var r = confirm('Are you sure you want to delete this appointment?');
    if (r) {
      var data = this.friends[index];
      console.log(index);
      this.userService.deleteAppointment(id).subscribe((resp) => {
        alert('Appointment with id ' + id + ' deleted successfully.');
        location.reload();
      });
    }
  }
  onSubmit() {
    console.log(this.editForm);
  }
  updateData() {
    //console.log(this.editForm.value.packages.packageName);
    if(this.editForm.valid)
    {
      var pn;
      var inr=this.editForm.value.inr;
      this.packages.forEach(element => {
       if(element.packageCost==inr)
       {
         pn=element.packageName;
       }
      });
    this.obj.firstname = this.editForm.value.firstname;
    this.obj.lastname = this.editForm.value.lastname;
    this.obj.age = this.editForm.value.age;
    this.obj.email = this.editForm.value.email;
    this.obj.phonenumber = this.editForm.value.phonenumber;
    this.obj.streetaddress = this.editForm.value.streetaddress;
    this.obj.city = this.editForm.value.city;
    this.obj.state = this.editForm.value.state;
    this.obj.pincode = this.editForm.value.pincode;
    this.obj.country = this.editForm.value.country;
    this.obj.physiotherapist = this.editForm.value.physiotherapist;
    this.obj.packages = pn
    this.obj.inr = this.editForm.value.inr;
    this.obj.paisa = this.editForm.value.paisa;
    this.obj.trainerpreference = this.editForm.value.trainerpreference;
    this.userService.editAppointment(this.obj).subscribe(
      (resp) => {
        alert('Edit Successful');
        this.obj = null;
        location.reload();
      },
      (err) => {
        alert('Something went wrong');
        location.reload();
      }
    );
    }
    else{
      console.log("Please provide valid data");
    }
  }
  onEditCliked(object) {
    console.log(object);
    this.editForm.setValue({
      firstname: object.firstname,
      lastname: object.lastname,
      age: object.age,
      email: object.email,
      phonenumber: object.phonenumber,
      streetaddress: object.streetaddress,
      city: object.city,
      pincode: object.pincode,
      state: object.state,
      country: object.country,
      packages: object.inr,
      inr: object.inr,
      paisa: object.paisa,
      physiotherapist: object.physiotherapist,
      trainerpreference: object.trainerpreference,
    });
    this.obj = object;
  }

  getfitness() {
    this.userService.getfitnessdata().subscribe((resp) => {
      this.friends = resp;
    });
  }
}
