import test from 'ava'
import { getPackageLatestVersion } from './package.js'

test('getPackageLatestVersion', async (t) => {
  const version = await getPackageLatestVersion('@fluxpress/core')
  console.log(import.meta.url)
  t.is(typeof version, 'string')
})
