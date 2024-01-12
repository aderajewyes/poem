/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles_Key } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string>(Roles_Key, 
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true; 
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      console.error('User object is undefined');
      return false; 
    }

    if (!user.role) {
      console.error('Role property is undefined in user object', user);
      return false; 
    }

    if (typeof user.role !== 'string') {
      console.error('Role property is not a string in user object', user);
      return false; 
    }

    if (!requiredRoles.includes(user.role)) {
      console.error(`User role '${user.role}' does not match any of the required roles`);
      return false; 
    }

    return true;
  }
}
