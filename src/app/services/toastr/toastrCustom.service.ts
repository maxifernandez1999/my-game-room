import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToastrCustomService {

  constructor(private toastr: ToastrService) { }

  success(clicks:any):ActiveToast<any>{
    return this.toastr.success('Ha ganado', `Ha encontrado el tesoro con ${clicks} clicks`, {
      timeOut: 3000,
    });
  }
}
