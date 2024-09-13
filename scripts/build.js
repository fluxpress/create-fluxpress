process.env.NODE_ENV = 'production'

import { remove } from 'fs-extra'

import { runCommand } from './utils.js'

await remove('out')
await runCommand({ command: 'tsc', name: 'tsc' })

await remove('dist')
await runCommand({ command: 'rollup --config', name: 'rollup' })
