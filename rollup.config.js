import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

const plugins = [resolve(), commonjs(), json()]

export default [
  {
    input: 'out/src/index.js',
    output: {
      file: 'dist/cli.js',
      format: 'esm',
    },
    plugins,
  },
]
