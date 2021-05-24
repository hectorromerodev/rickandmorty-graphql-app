import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { SpinnerService } from "../services/spinner.service";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(
    private spinnerServ: SpinnerService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerServ.show();
    return next.handle(req).pipe(
      finalize(() => this.spinnerServ.hide()));
  }
}
