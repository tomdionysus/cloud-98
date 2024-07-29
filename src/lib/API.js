class API {

	constructor({fetch}) {
		this.fetch = fetch || window.fetch
	}

}

export default API