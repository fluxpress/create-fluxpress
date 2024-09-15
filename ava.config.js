export default {
  typescript: {
    rewritePaths: {
      'src/': 'out/src/',
      'test/': 'out/test/',
    },
    compile: false, // 'tsc' | false
  },
}
