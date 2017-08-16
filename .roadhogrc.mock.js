import path from 'path'
import fs from 'fs'

const mock = {}
const files = fs.readdirSync(path.join(__dirname + '/src/mock')).forEach(file => {
	Object.assign(mock, require('./src/mock/' + file))
})

module.exports = mock
