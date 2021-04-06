import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

import createConnection from '../index'

const create = async () => {
  const connection = await createConnection('localhost')

  const permission_id = uuidV4()
  const role_id = uuidV4()
  const user_id = uuidV4()
  const password = await hash('admin', 8)

  await connection.query(
    `INSERT INTO PERMISSIONS(id, name, description)
      values(${permission_id}, 'create', 'anything')`,
  )

  await connection.query(
    `INSERT INTO ROLES(id, name, description)
      values(${role_id}, 'ROLE_ADMIN', 'Administrators')`,
  )

  await connection.query(
    `INSERT INTO USERS(id, name, username, email, password, driver_license)
      values('${user_id}', 'Administrator', 'admin', 'admin@admin.com', '${password}', '123456789')`,
  )

  await connection.query(
    `INSERT INTO PERMISSIONS_ROLES(role_id, permission_id)
      values('${role_id}', '${permission_id}')`,
  )

  await connection.query(
    `INSERT INTO USERS_ROLES(role_id, user_id)
      values('${role_id}', '${user_id}')`,
  )

  await connection.close()
}

create()
  .then(() => console.log('Permission, Role and User admin created'))
  .catch(error => console.error(error))
