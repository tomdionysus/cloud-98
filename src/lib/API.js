class API {
	constructor({fetch, apiUrl}) {
		this.fetch = fetch || window.fetch
		this.apiUrl = apiUrl || 'http://localhost:8080'
		this.sessionToken = localStorage.getItem('sessionToken')
    this.sessionRefreshToken = localStorage.getItem('sessionRefreshToken');
	}

	_doCall(method, path, body, callback) {
		var headers = {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	    }, res

	    if(this.sessionToken) headers["Authorization"] = 'Bearer '+this.sessionToken

	    fetch(this.apiUrl+path, {
	        method: method,
	        headers: headers,
	        body: body ? JSON.stringify(body) : undefined,
	    })
	    .then(response => {
	    	res = response
	        if (!response.ok) {
	        	// TODO: Handle automatic session retry
	            throw new Error(`Error: ${response.status} ${response.statusText}`);
	        }
	        return response.json();
	    })
	    .then(data => {
	      callback(null, data, res);
	    })
	    .catch(error => {
	      callback(error, res);
	    });
	}

  hasSession() {
    return !!this.sessionToken
  }

  getSession(callback) {
    this._doCall('GET','/v1/session', null, callback)
  }

	login(email, password, callback) {
		this._doCall('POST','/v1/session', { email: email, password: password }, (err, data) => {
			if(err) return callback(err)
      this.sessionToken = data.session.id
      this.sessionRefreshToken = data.session.refresh_token
      localStorage.setItem('sessionToken', this.sessionToken)
      localStorage.setItem('sessionRefreshToken', this.sessionRefreshToken)
			callback(null, data)
		})
	}

  logout(callback) {
    this._doCall('DELETE','/v1/session', null, callback)
    localStorage.removeItem('sessionToken')
    localStorage.removeItem('sessionRefreshToken')
    delete this.sessionToken
    delete this.sessionRefreshToken
  }

  getVPC(callback) {
    this._doCall('GET','/v1/vpc', null, (err, data) => {
      if(err) return callback(err)
      return callback(null, data.vpc)
    })
  }

}

export default API