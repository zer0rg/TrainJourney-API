import { sequelize } from './connector'
import { syncDatabase } from './dbinstaller'
async function testConnection() {
  try {
    await sequelize.authenticate()
    return 'Conexión exitosa a MySQL con Sequelize.'
  } catch (error) {
    return 'Error al conectar a la base de datos:' + error
  }
}

testConnection().then( res => {
    console.log(res)
    syncDatabase().then(res => {
        console.log(res)
    })
}
)
