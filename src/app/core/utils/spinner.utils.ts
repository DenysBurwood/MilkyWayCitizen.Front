import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
    private loadingSubject = 
    new BehaviorSubject<boolean>(false);
    loadingStatus = this.loadingSubject.asObservable();
    loadingOn() 
    {
        this.loadingSubject.next(true);
    }
    loadingOff() 
    {
        this.loadingSubject.next(false);
    }
}
