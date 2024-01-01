/* eslint-disable prettier/prettier */
import { AuthGuard } from "@nestjs/passport";
export class jwtGuard extends AuthGuard('jwt'){
    constructor(){
        super();
    }
}