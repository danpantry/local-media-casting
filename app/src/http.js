import pathToRegexp from 'path-to-regexp'

/**
 * Thrown when receiving the wrong media type from a fetch call.
 */
export class BadMediaError extends Error {
  name = 'BadMediaError'
}

/**
 * Retrieve JSON from the given path.
 * @param {String} path the path to send the request to. This can be an express style path with placeholders.
 * @param {Object} [placeholders] An object to fill any placeholders passed in `path`.
 */
export async function getJson(path, placeholders) {
  path = pathToRegexp.compile(path)(placeholders)

  const response = await window.fetch(path, {
    headers: {
      accept: 'application/json'
    }
  })

  if (response.status === 404) {
    return null
  }

  if (response.headers.get('content-type') !== 'application/json') {
    throw new BadMediaError('did not receive application/json')
  }

  return await response.json()
}
