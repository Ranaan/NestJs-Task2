import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { TaskService } from "../task/task.service";
//import * as data from '../../db/data.json';

let users = [
    {
        "id": 1,
        "username": "Ranan",
        "password": "1234"
    },
    {
        "id": 2,
        "username": "Mona",
        "password": "5678"
    },
    {
        "id": 3,
        "username": "Lama",
        "password": "La125"
    },
    {
        "id": 4,
        "username": "Rana",
        "password": "Ra21"
    },
    {
        "id": 5,
        "username": "Laila",
        "password": "lolo2"
    }
]

@Injectable()
export class UserService{
    constructor(private readonly taskService:TaskService){}
    findAll(){
        return users;
    }
    findOne(userId:number){
        const user = users.filter(user => user.id === userId);
		if (!user) {
			throw new BadRequestException('User Not Found!');
		}
		const tasks = this.taskService.findUserTasks(userId)
		return {
			user,
			tasks
		}
    }
    addOne(body:any){
        users.push(body)
        return users
    }
    updateOne(userId:number, userDto:any){
        users= users.map(user=> {
            if(user.id === userId){
                return {
                    ...user,
                    ...userDto
                }
            }
            return user
        })
        return users;
    }
    deleteOne(userId:number){
        const userInDatabase = users.find(user => user.id === userId)
		if (!userInDatabase) {
			throw new HttpException('User Not Found!', 404)
		}
		users = users.filter(user => user.id !== userInDatabase.id);
		return users;
    }
}