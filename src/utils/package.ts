import { logger } from '@fluxpress/core'
import fetch from 'npm-registry-fetch'

export async function getPackageLatestVersion(packageName: string) {
  try {
    const response = await fetch.json(`/${packageName}`)
    return response['dist-tags']['latest']
  } catch (error) {
    logger.error(`未能获取 ${packageName} 的最新版本。`)
    logger.error(error)
    return null
  }
}
