import fs from 'fs'
import path from 'path'

function getCronProjectScript(project_id: number, cron_name: string) {
  try {
    return fs.readFileSync(path.join(process.cwd(), 'SCRIPTS', project_id.toString(), 'cron', `${cron_name}.js`), 'utf8')
  } catch (err) {
    console.error(err.message)
    return null
  }
}

function getPushProjectScript(project_id: number) {
  try {
    return fs.readFileSync(path.join(process.cwd(), 'SCRIPTS', project_id.toString(), 'push.js'), 'utf8')
  } catch (err) {
    console.error(err.message)
    return null
  }
}

export { getCronProjectScript , getPushProjectScript }
