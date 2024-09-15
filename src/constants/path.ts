import { fileURLToPath } from 'url'
import path from 'node:path'

export const TEMPLATE_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../',
  'template',
)
