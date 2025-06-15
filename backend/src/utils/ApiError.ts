class ApiError<T=undefined> extends Error{
  statusCode:number;
  error?:T;

  constructor(statusCode:number=403,message:string="Something went wrong",error?:T){
    super(message);
    this.statusCode=statusCode;
    if(error)
      this.error=error
  }
}

export default ApiError;