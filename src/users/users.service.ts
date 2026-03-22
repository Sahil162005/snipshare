    import { ConflictException, Injectable } from "@nestjs/common";
    import { PrismaService } from "src/prisma/prisma.service";
    import { CreateUserDto } from "./dto/create-user.dto";
    import * as  bcrypt from 'bcrypt';
    import * as crypto from 'crypto'
    @Injectable()
    export class UsersService{
        constructor(private prisma :PrismaService ){}
        async register(dto:CreateUserDto){
        const exists=await this.prisma.user.findUnique({
                where:{
                    email:dto.email
                }
            })
            if(exists){
                throw new ConflictException("Email already in use")
            }
            const apiprefix= crypto.randomBytes(4).toString('hex')
            const apikey= crypto.randomBytes(16).toString('hex')
            const fullkey=`sk_${apiprefix}_${apikey}`
            const hashedapikey=await bcrypt.hash(apikey,12);
            const user=await this.prisma.user.create({
                data:{
                    email : dto.email,
                    apiPrefix :apiprefix,
                    hashedKey :hashedapikey,
                    keyCreatedAt :new Date()
                }
            })
            return {
                id:user.id,
                email:user.email,
                fullkey
            }
        }
    }