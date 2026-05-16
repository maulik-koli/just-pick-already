import { ZodError } from "zod"
import { ApiError, StatusCodeType } from "@/types/api"


export const errorHandler = (error: any): { err: ApiError, status: number }  => {
    let code: StatusCodeType = "INTERNAL_SERVER_ERROR"
    let message: string = error.message || "Something went wrong, please try again leter"
    let status: number = 500
    
    if (error instanceof ZodError) {
        status = 400
        code = "BAD_REQUEST"
        
        if( error.issues[0].code === 'invalid_type' || 
            error.issues[0].code === 'unrecognized_keys'
        ){
            message = "Invalid payload data"
        }
        message = error.issues[0].message
    }
    
    return {
        err: {
            success: false,
            code,
            message
        },
        status
    }
}