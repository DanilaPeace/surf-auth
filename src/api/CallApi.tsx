import qs from "query-string";

// Class to wort with api
class ApiCall {
  async perform(url: string, data?: any, config?: any) {
    
    const request = await fetch(url, {
      ...config,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    
    let body = await request.json();
    return body;
  }

  async get(path: string, searchParams = {}) {
    return await this.perform(`${path}?${qs.stringify(searchParams)}`);
  }

  async post(path: string, payload) {
    return await this.perform(path, payload, {
      method: "POST",
    });
  }

  async put(path: string, payload) {
    return await this.perform(path, payload, {
      method: "PUT",
    });
  }

  async delete(path: string) {
    return await this.perform(path, {
      method: "PUT",
    });
  }
}

export default new ApiCall();
