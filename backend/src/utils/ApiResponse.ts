class ApiResponse<T>{
  statusCode:number;
  message:string;
  data?:T;
  success:boolean=true;
  meta?:T;

  constructor(statusCode:number,message:string="Success",data?:T,meta?){
    this.statusCode=statusCode;
    this.message=message;
    this.meta=meta;
    if(data){
      this.data=data
    }
  }

}

export default ApiResponse;