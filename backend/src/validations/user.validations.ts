import {z} from "zod"
// user1Username,user1Password,user2Username,user2Password
const userSignupValidation=z.object({
  username:z.string().min(2).max(100),
  password:z.string().min(8).max(100)
    .regex(/[A-Z]/,"Atleast 1 uppercase letter is required")
    .regex(/[a-z]/,"Atleast 1 lowercase letter is required")
    .regex(/[0-9]/,"Atleast 1 digit is required")
    .regex(/[^A-Za-z0-9]/,"Atleast 1 special character is required")
})

const userLogin=z.object({
  username:z.string().min(2).max(100),
  password:z.string().min(8,"Min Password length : 8").max(100)
})

// const 

