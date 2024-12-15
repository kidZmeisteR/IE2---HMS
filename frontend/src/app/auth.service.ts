import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from './environment';

export interface Staff {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Staff | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/login`, { username, password })
      .pipe(
        tap((response: any) => {
          console.log(response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.staff));
          this.currentUserSubject.next(response.staff);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}