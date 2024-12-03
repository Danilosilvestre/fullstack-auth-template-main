import { AppError } from "@/utils/AppError"
import { Request, Response } from "express"
import { authConfig } from "@/configs/auth"
import { sign } from "jsonwebtoken"


class SessionsController {
  async create(request: Request, response: Response) {
    const  { username, password } = request.body

    const fakeUser = {
      id: "1",
      username: "danilo",
      password: "123456",
      role: "customer"
    }

    if(username !== fakeUser.username || password !== fakeUser.password){
      throw new AppError("Usuário e/ou senha incorreta", 401)
    }
    
    const { secret } = authConfig.jwt
    const token = sign({ role: fakeUser.role}, secret, { 
      expiresIn: "1d",
      subject: String(fakeUser.id),
    })

     return response.json({ token })
  }
}

export { SessionsController }
