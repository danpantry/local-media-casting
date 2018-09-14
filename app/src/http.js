/**
 * Thrown when receiving the wrong media type from a fetch call.
 */
export class BadMediaError extends Error {
  name = 'BadMediaError'
}

/**
 * Retrieve JSON from the given path.
 */
export async function getJson(path) {
  const response = await window.fetch(path, {
    headers: {
      accept: 'application/json'
    }
  })

  if (response.headers.get('content-type') !== 'application/json') {
    throw new BadMediaError('did not receive application/json')
  }

  return await response.json()
}
