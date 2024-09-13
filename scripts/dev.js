process.env.NODE_ENV = 'development'

import { remove } from 'fs-extra'

import { runCommand, runCommandsConcurrently } from './utils.js'

await remove('out')
await runCommand({ command: 'tsc', name: 'first tsc', prefixColor: 'red' })

await remove('dist')
await runCommandsConcurrently([
  { command: 'tsc --watch', name: 'tsc', prefixColor: 'red' },
  { command: 'rollup --config --watch', name: 'rollup', prefixColor: 'yellow' },
])
