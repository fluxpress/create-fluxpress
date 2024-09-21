import test from 'ava'
import { getPackageLatestVersion } from './package.js'

test('getPackageLatestVersion', async (t) => {
  const version = await getPackageLatestVersion('@fluxpress/theme-classic')
  t.is(typeof version, 'string')
})
