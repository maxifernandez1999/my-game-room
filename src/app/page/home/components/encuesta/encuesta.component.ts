import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Encuesta } from 'src/app/models/encuesta';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  productsForm: FormGroup;
  dataOrigin: string[] = [];
  punt:string;
  constructor(
    private fb: FormBuilder,
    private data: DataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.productsForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      age: ['', [Validators.required, Validators.min(18),Validators.max(99),Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/),Validators.maxLength(10)]],
      fav: ['', [Validators.required]],
      question: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }
  get codeValue(): string {
    return this.productsForm.get('name').value;
  }
  get descriptionValue(): string {
    return this.productsForm.get('lastName').value;
  }
  get priceValue(): string {
    return this.productsForm.get('age').value;
  }
  get stockValue(): string {
    return this.productsForm.get('phone').value;
  }
  get eatableValue(): boolean {
    return this.productsForm.get('eatable').value;
  }
  public get form(): any {
    return this.productsForm.controls;
  }
  public getOriginValue(event: string[]): void {
    this.dataOrigin = event;
  }
  addEncuesta(){
    let encuesta:Encuesta = new Encuesta();
    encuesta.nombre=this.productsForm.value.name;
    encuesta.apellido=this.productsForm.value.lastName;
    encuesta.edad=this.productsForm.value.age;
    encuesta.telefono=this.productsForm.value.phone;
    encuesta.conocer=this.productsForm.value.question;
    encuesta.email="";
    encuesta.puntuacion=this.punt;
    encuesta.juegoFav=this.productsForm.value.fav;
    console.log(encuesta);
    this.data.GuardarEncuesta(encuesta).then(() => {
      this.toastr.success("Encuesta guardada", "¡Gracias por tus comentarios!")
    })
    .catch(err => {
      this.toastr.error("Al guardar encuesta: " + err.message, "Error");
    })
    // this.estado='2';
  
  }
  public getRadioButtonChecked(number:string):void{
    this.punt = number;
  }

}
