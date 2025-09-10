export interface IResponse  {

    message:string;
    statusCode:number;
    success:boolean;
}



export interface IResponseOf<TResult>  extends IResponse{

   result:TResult;
}


export interface IPaginationResponse<TResponse> extends IResponse{
    result: TResponse[]
    pageSize: number
    pageIndex: number
    totalCount: number
    count: number
    totalPages: number
    moveNext: boolean
    movePrevious: boolean    
}

export interface IPagination {
    pageSize: number;
    pageIndex: number;
    totalCount: number;
    count: number;
    totalPages: number;
    moveNext: boolean;
    movePrevious: boolean;
  }