import { Injectable } from '@nestjs/common';
import { User } from "@prisma/client";
import { AuthGuard } from "@nestjs/passport";


export interface UserRequest {
    user: User;
}

@Injectable()
export class AuthGuardService extends AuthGuard('jwt') {}
