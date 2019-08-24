import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";

import { TokenService } from "../token/token.service";

@Injectable()
export class  RequestInteceptor implements HttpInterceptor{
    
    constructor(private tokenService: TokenService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        
        if(this.tokenService.getToken()) {
            console.log(this.tokenService.getToken());
            console.log(req);
            req = req.clone({
                setHeaders: {
                    'x-access-token': this.tokenService.getToken()
                }
            })
        }
        
        return next.handle(req);
    }
    
    
}