import concurrently from 'concurrently'

/**
 *
 * @param {import('concurrently').ConcurrentlyCommandInput} command
 * @param {Partial<import('concurrently').ConcurrentlyOptions>} options
 * @returns
 */
export async function runCommand(command, options = {}) {
  return new Promise((resolve) => {
    const { result } = concurrently([command], options)
    result.then(resolve)
  })
}

/**
 *
 * @param {import('concurrently').ConcurrentlyCommandInput[]} commands
 * @param {Partial<import('concurrently').ConcurrentlyOptions>} options
 * @returns
 */
export async function runCommandsConcurrently(commands, options = {}) {
  return new Promise((resolve) => {
    const { result } = concurrently(commands, options)
    result.then(resolve)
  })
}
