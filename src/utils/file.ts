import fs from 'fs-extra'
import path from 'node:path'
import ejs from 'ejs'

/**
 * 拷贝时递归遍历每一个文件，将 '_' 开头的文件名，替换为 '.'
 *
 * @param srcDir
 * @param destDir
 */
export async function copyFilesConvertPrefix(srcDir: string, destDir: string) {
  const files = await fs.readdir(srcDir, { withFileTypes: true })
  for (const file of files) {
    if (file.isDirectory()) {
      await copyFilesConvertPrefix(
        path.join(srcDir, file.name),
        path.join(destDir, file.name),
      )
    } else {
      const newFileName = file.name.startsWith('_')
        ? file.name.replace(/^_/, '.')
        : file.name
      await fs.copy(
        path.join(srcDir, file.name),
        path.join(destDir, newFileName),
      )
    }
  }
}

/**
 * 拷贝时递归遍历每一个文件，并通过 ejs 渲染填充数据
 *
 * @param srcDir
 * @param destDir
 * @param data
 */
export async function copyFilesDataRender(
  srcDir: string,
  destDir: string,
  data: { [name: string]: any },
) {
  const files = await fs.readdir(srcDir, { withFileTypes: true })
  for (const file of files) {
    if (file.isDirectory()) {
      await copyFilesDataRender(
        path.join(srcDir, file.name),
        path.join(destDir, file.name),
        data,
      )
    } else {
      const newFileName = file.name.replace(/\.ejs$/, '')
      const content = await ejs.renderFile(path.join(srcDir, file.name), data)
      await fs.outputFile(path.join(destDir, newFileName), content, {
        encoding: 'utf-8',
      })
    }
  }
}
