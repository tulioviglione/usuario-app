import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { UserService } from '../user/user.service';
import { TokenDTO } from './tokenDTO';
import { ResponseDTO } from './responseDTO';

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
            .post<ResponseDTO<TokenDTO>>(API_URL,
                { email, senha },
                { observe: 'response'}) // da acesso a resposta
            .pipe(tap(res => {
                const authToken = res.body.data.token; // nome do cabeçalho onde esta armazenado o token
                this.userService.setToken(authToken);
                console.log(`User ${email} authenticated with token ${authToken}`);
            }));
    }
}
