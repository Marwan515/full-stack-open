const app = require('./app')
const config = require('./utils/config')
const mw = require('./utils/middleware')

app.listen(config.PORT, () => {
  mw.logger(`Server running on port ${config.PORT}`)
})