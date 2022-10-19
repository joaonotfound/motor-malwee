

export interface HttpRequest<P=any, T=any>{
    params: P,
    body: T
}

export interface HttpResponse<T=any>{
    status_code: number,
    body: T
}