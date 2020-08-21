import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../_services';
import { Package } from '../Utils/Package';
import Utils from '../Utils/utils';

export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname: string,
    public lastname: string,
    public age: number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) {}
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html',
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {
  fitnessForm: FormGroup;
  packages = null;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.packages = Utils.getPackages();
  }

  ngOnInit() {
    this.fitnessForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(60)]],
      email: ['', [Validators.required, Validators.email,Validators.pattern('[^ @]*@[^ @]*')]],
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
    this.fitnessForm.controls['packages'].valueChanges.subscribe((value) =>
      this.fitnessForm.patchValue({
        inr: value,
        paisa: value* 100,
        
      })
    );
  }

  onSubmit() {
    if (this.fitnessForm.valid) {
      var pn;
      var inr=this.fitnessForm.value.inr;
      this.packages.forEach(element => {
       if(element.packageCost==inr)
       {
         pn=element.packageName;
       }
      });
      var fitness: Fitness = new Fitness(
        this.fitnessForm.value.inr,
        this.fitnessForm.value.paisa,
        this.fitnessForm.value.streetaddress,
        this.fitnessForm.value.city,
        this.fitnessForm.value.state,
        this.fitnessForm.value.country,
        this.fitnessForm.value.pincode,
        this.fitnessForm.value.phonenumber,
        this.fitnessForm.value.email,
        this.fitnessForm.value.firstname,
        this.fitnessForm.value.lastname,
        this.fitnessForm.value.age,
        this.fitnessForm.value.trainerpreference,
        this.fitnessForm.value.physiotherapist,
        pn
      );
      console.log(fitness);
      this.userService.postfitnessdata(fitness).subscribe((resp) => {
        alert('Appointment placed');
        location.reload();
      });
    } else {
      alert('Please fill out the form properly and completely');
    }
  }
}
