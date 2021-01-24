import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "../dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';
@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<any> {
        const { username, password } = authCredentialsDto;
        const exist = this.findOne({ username });
        // if (exist) {
        //     // throw await new ConflictException('username already exist ', 'new desc');
        //     return  { errorstatus: 'true', payload:'errro'}
        // }
        // const salt = await bcrypt.genSalt();
        // console.log('salt', salt);
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        // console.log('user password', user);
        try {
            await user.save();
        } catch (error) {
            // console.log(error);
            if (error) {
                throw await new InternalServerErrorException();
            } else {
                throw await new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {

        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username });
        // console.log('user', user);
        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string) {
        return bcrypt.hash(password, salt);
    }
}


