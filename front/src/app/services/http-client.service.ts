export interface IHttpResponse<T> extends Response {
  parsedBody?: T;
}

export const httpClientService = async <T>(
  request: RequestInfo,
  init?: RequestInit
): Promise<IHttpResponse<T>> => {
  return new Promise((resolve, reject) => {
    let response: IHttpResponse<T>;
    fetch(request, init)
      .then((res) => {
        response = res;
        return res.json();
      })
      .then((body) => {
        if (response.ok) {
          response.parsedBody = body;
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
