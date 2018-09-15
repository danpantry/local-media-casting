import pathToRegexp from 'path-to-regexp'

/**
 * Thrown when receiving the wrong media type from a fetch call.
 */
export class BadMediaError extends Error {
  name = 'BadMediaError'
}

export async function makeRequest(method, url, data) {
  const response = await window.fetch(url, {
    method,
    headers: {
      accept: 'application/json'
    },
    body: data
  })

  if (response.status === 404) {
    return null
  }

  if (response.headers.get('content-type') !== 'application/json') {
    throw new BadMediaError('did not receive application/json')
  }

  return await response.json()
}

export function makeUrl(path, placeholders) {
  return pathToRegexp.compile(path)(placeholders)
}

/**
 * Retrieve JSON from the given path.
 * @param {String} path the path to send the request to. This can be an express style path with placeholders.
 * @param {Object} [placeholders] An object to fill any placeholders passed in `path`.
 */
export async function getJson(path, placeholders) {
  return await makeRequest('get', makeUrl(path, placeholders))
}

export async function postJson(path, placeholders, data = undefined) {
  return await makeRequest('post', makeUrl(path, placeholders), data)
}
