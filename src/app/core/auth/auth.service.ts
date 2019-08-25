import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { UserService } from '../user/user.service';

const API_URL = 'http://localhost:4200/api/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private userService: UserService) { }

    authenticate(email: string, senha: string) {

        return this.http
            .post(API_URL,
                { email, senha },
                { observe: 'response'} ) // da acesso a resposta
            .pipe(tap(res => {
                console.log(res);
                const authToken = res.headers.get('x-access-token'); // nome do cabeçalho onde esta armazenado o token
                this.userService.setToken(authToken);
                console.log(`User ${email} authenticated with token ${authToken}`);
            }));
    }
}
