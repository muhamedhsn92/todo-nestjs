
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user-db/user.entity';

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext):User => {
        const request = ctx.switchToHttp().getRequest();
        // console.log('equest', request.user);
        return request.user;
    },
);  