import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { Service } from 'src/app/shared/models/Service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent {
  NewServiceForm!:FormGroup;
  isSubmited = false;
  myService!:Service;
  name!:String;
  description!:String;
  price!:String;
  returnUrl = '';
  imgPath!:String;


  constructor(private formBuilder:FormBuilder,
    private serviceService:ServiceService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit():void{
    this.NewServiceForm = this.formBuilder.group({
      name:['',[Validators.required]],
      price:['',Validators.required],
      description:['',Validators.required],
      imgPath:['',Validators.required]

    })

  };

  get fc(){
    return this.NewServiceForm.controls;
  }
submit(){
    console.log("click in submit fyunction");
    console.log(this.fc.name.value);
    console.log(this.fc.description.value);
    console.log(this.fc.price.value);
    console.log(this.fc.imgPath.value);

    this.isSubmited = true;
    if(this.NewServiceForm.invalid) return;

    this.myService = {

      name:this.fc.name.value,
      description:this.fc.description.value,
      price:this.fc.price.value,
      imgPath:this.fc.imgPath.value
    }
    this.serviceService.updateService(this.myService).subscribe(
      (data)=>{
        console.log(data);
        this.router.navigateByUrl('/')
      }
    )
  }
}