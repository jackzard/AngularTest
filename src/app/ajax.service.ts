import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AjaxService {

  constructor(
    private Http: HttpClient
  ) {
  }

  GetData() {
    return this.Http.get('/assets/sample.json').toPromise()
  }

}
