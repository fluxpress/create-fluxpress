import test from 'ava'
import { copyFilesDataRender } from './file.js'
import { APP_ROOT_PATH } from '@fluxpress/core'
import path from 'node:path'

test('copyFilesDataRender', async (t) => {
  const projectName = 'temp'
  const renderData = {
    package: {
      name: projectName,
      cliVersion: '0.1.0',
      coreVersion: '0.1.0',
      themeName: '@fluxpress/theme-classic',
      themeVersion: '0.1.0',
    },
    config: {
      owner: 'liangpengyv',
      repo: 'git-blog',
      theme: 'classic',
    },
  }
  await copyFilesDataRender(
    path.join(APP_ROOT_PATH, 'template', 'fill'),
    path.join(APP_ROOT_PATH, projectName),
    renderData,
  )

  t.pass()
})
