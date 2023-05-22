import fs from 'fs'
import path from 'path'

function getCronProjectScript(project_id: string) {
    return fs.readFileSync(path.join(process.cwd(), 'scripts', project_id, 'cron.js'), 'utf8')
}

function getPushProjectScript(project_id: number) {
  try {
    return fs.readFileSync(path.join(process.cwd(), 'scripts', project_id.toString(), 'push.js'), 'utf8')
  } catch (err) {
    console.error(err)
    return null
  }
}

// function getPushSystemScript() {
//   let ext = process.env.NODE_ENV === 'development' ? 'ts' : 'js'
//   let scriptPath = path.join(__dirname, '../providers', 'scripts', `push.${ext}`)

//   try {
//     return fs.readFileSync(scriptPath, 'utf8')
//   } catch (err) {
//     console.error(err)
//     return null
//   }
// }

export { getCronProjectScript , getPushProjectScript }
