#!/usr/bin/env node

import { readFileSync } from 'node:fs'

const pkg = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url)),
)

console.log(`create-fluxpress version: ${pkg.version}`)
