import { logger } from '@fluxpress/core'
import { Command } from 'commander'
import prompts from 'prompts'
import path from 'node:path'
import fs from 'fs-extra'
import { TEMPLATE_PATH } from './constants/path.js'
import { copyFilesConvertPrefix, copyFilesDataRender } from './utils/file.js'
import { getPackageLatestVersion } from './utils/package.js'

const program = new Command()

const ANSWERS_TYPES = [
  'projectName',
  'gitHubOwner',
  'gitHubRepo',
  'isOfficialTheme',
  'themeName',
] as const

interface RenderData {
  package: {
    name: string
    cliVersion: string
    coreVersion: string
    themeName: string
    themeVersion: string
  }
  config: {
    owner: string
    repo: string
    theme: string
  }
}

const questions: Array<prompts.PromptObject<(typeof ANSWERS_TYPES)[number]>> = [
  {
    type: 'text',
    name: 'projectName',
    message: 'Project name:',
    initial: 'fluxpress-project',
  },
  {
    type: 'text',
    name: 'gitHubOwner',
    message: 'Repository owner:',
  },
  {
    type: 'text',
    name: 'gitHubRepo',
    message: 'Repository name:',
  },
  {
    type: 'select',
    name: 'isOfficialTheme',
    message: 'Select a theme (Channel):',
    choices: [
      {
        title: 'Official',
        value: true,
      },
      {
        title: 'Community',
        value: false,
        disabled: true, // 暂时没有收录的社区主题
      },
    ],
  },
  {
    type: 'select',
    name: 'themeName',
    message: 'Select a theme:',
    choices: [
      {
        title: 'classic',
        value: 'classic',
      },
    ],
  },
]

async function handleAnswer(
  answers: prompts.Answers<(typeof ANSWERS_TYPES)[number]>,
) {
  // 创建项目文件夹
  if (await fs.pathExists(answers.projectName)) {
    logger.error(`文件夹 ${answers.projectName} 已存在`)
    return
  }
  await fs.ensureDir(answers.projectName)

  // 添加直接拷贝的文件
  await copyFilesConvertPrefix(
    path.join(TEMPLATE_PATH, 'copy'),
    answers.projectName,
  )

  // 添加填充数据的文件
  const renderData: RenderData = {
    package: {
      name: answers.projectName,
      cliVersion: await getPackageLatestVersion('@fluxpress/cli'),
      coreVersion: await getPackageLatestVersion('@fluxpress/core'),
      themeName: answers.isOfficialTheme
        ? `@fluxpress/theme-${answers.themeName}`
        : `fluxpress-theme-${answers.themeName}`,
      themeVersion: await getPackageLatestVersion(
        answers.isOfficialTheme
          ? `@fluxpress/theme-${answers.themeName}`
          : `fluxpress-theme-${answers.themeName}`,
      ),
    },
    config: {
      owner: answers.gitHubOwner,
      repo: answers.gitHubRepo,
      theme: answers.themeName,
    },
  }
  await copyFilesDataRender(
    path.join(TEMPLATE_PATH, 'fill'),
    answers.projectName,
    renderData,
  )

  // 添加主题配置文件
  await fs.copy(
    path.join(
      TEMPLATE_PATH,
      'theme-configs',
      answers.isOfficialTheme ? 'official' : 'community',
      `fluxpress.config.${answers.themeName}.js`,
    ),
    path.join(answers.projectName, `fluxpress.config.${answers.themeName}.js`),
  )
}

program
  .action(async () => {
    const answers = await prompts(questions, {
      onCancel: () => logger.error('操作已取消'),
    })

    if (Object.keys(answers).length !== ANSWERS_TYPES.length) return

    await handleAnswer(answers)
  })
  .parse()
