import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import { User } from './user';

@Injectable({ providedIn: 'root' })
export class UserService {

    private userSubject = new BehaviorSubject<User>(null);
    userName: any;

    constructor(private tokenService: TokenService) { 
        
        this.tokenService.hasToken() && this.decodeAndNotify();
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }
    decodeAndNotify() {
        const token = this.tokenService.getToken();
        const user = jwt_decode(token) as User; //<- (aqui a chamada jwt_decode)
        this.userName = user.name;
        this.userSubject.next(user);
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    isLogged(){
        return this.tokenService.hasToken();
    }

    getUserName() {
        return this.userName;
    }
}