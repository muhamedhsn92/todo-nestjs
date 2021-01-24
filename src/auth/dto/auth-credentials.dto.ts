import { IsString, Matches, MaxLength, MinLength } from "class-validator";
export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
    @IsString()
    @MinLength(8, { message: `you need to provide at minimum 8 letter` })
    @MaxLength(20)
    // @Matches(/((/) 
    password: string;
}