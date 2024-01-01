/* eslint-disable prettier/prettier */

import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthenticationDto } from "./dto/auth.dto";
@Controller('auth')
export class AuthController {
    constructor (private authService:AuthService) {}
        @Post('signup')  
        signup(@Body() dto:AuthenticationDto) {
            
            return this.authService.signup(dto)

        }
        @Post('login')
        login(@Body() dto:AuthenticationDto){
            return this.authService.login(dto)

        }
    }
