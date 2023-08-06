interface ResponseHttp {
  code: number;
  data: any;
}

class ResponseHttp implements ResponseHttp {

  constructor (code: number) {
    this.code = code
  }

  setCode (code: number) {
    this.code = code
  }

  setData (data: any) {
    this.data = {
      data
    }
  }

  setDataCustom (data: any) {
    this.data = data
  }

  setError (message: string, params: any, errorData: any) {
    this.data = {
      message: message,
      params: params,
      errorData: errorData
    }
  }
}

export default ResponseHttp
