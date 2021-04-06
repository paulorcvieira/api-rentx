import { hash } from 'bcrypt'
import request from 'supertest'
import { Connection } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { app } from '@shared/infra/http/app'
import createConnection from '@shared/infra/typeorm'

let connection: Connection

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const permission_id = uuidV4()
    const role_id = uuidV4()
    const user_id = uuidV4()
    const password = await hash('admin', 8)

    await connection.query(
      `INSERT INTO PERMISSIONS(id, name, description)
      values('${permission_id}', 'create', 'anything')`,
    )

    await connection.query(
      `INSERT INTO ROLES(id, name, description)
      values('${role_id}', 'ROLE_ADMIN', 'Administrators')`,
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
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  test('should be able to create a new category', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ emailOrUsername: 'admin@admin.com', password: 'admin' })

    const { token } = responseToken.body

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.status).toBe(201)
  })
})
