class API {
	constructor({fetch, apiUrl}) {
		this.fetch = fetch || window.fetch
		this.apiUrl = apiUrl || 'http://localhost:8080'
		this.sessionToken = null;
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

	login(email, password, callback) {
		this._doCall('POST','/v1/session', { email: email, password: password }, (err, data) => {
			if(err) return callback(err)
			callback(err)
		})
	}

}

export default API