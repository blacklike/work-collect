import axios from 'axios'
import qs from 'qs'

axios.defaults.withCredentials = true
const request = (url, options) => {
	let params = {}
	let urlreal = url

	if (options.method == 'post') {
		let headers = options.headers || {}

		if (!headers["Content-Type"]) {
			headers["Content-Type"] = "application/json"
		}

		params = {
			method: 'post',
			url: urlreal,
			headers: headers,
			data: JSON.stringify(options.data)
		}

	} else if (options.method == 'get') {

		params = {
			method: 'get',
			headers: {},
			url: urlreal,
			params: options.data
		}
	} else if (options.method == 'postform') {

		let headers = options.headers || {}

		if (!headers["Content-Type"]) {
			headers["Content-Type"] = "application/x-www-form-urlencoded"
		}

		params = {
			method: 'post',
			url: `${urlreal}?${qs.stringify(options.data)}`,
			headers: headers
		}
	}

	return axios({

		...params

	})

}

function catchErrorFn() {
  lib.bridge.callNative('netWorkError')
  return {}
}

export const post = (url, data) => request(url, {
	method: 'post',
	headers: {},
	data
}).then(({ data }) => data || {}).catch(catchErrorFn)


export const get = (url, data) => request(url, {
	method: 'get',
	headers: {},
	data
}).then(({ data }) => data || {}).catch(catchErrorFn)

const axiosRequest = (url, data) => request(url, data).then(data => data || {}).catch(catchErrorFn)

export default axiosRequest