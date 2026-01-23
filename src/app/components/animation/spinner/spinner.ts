import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { SpinnerService } from '@core/utils/spinner.utils';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  imports: [AsyncPipe],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
})
export class Spinner 
{
    loading: Observable<boolean>;
    constructor(_spinner: SpinnerService)
    {
        this.loading=_spinner.loadingStatus;
    }
}
