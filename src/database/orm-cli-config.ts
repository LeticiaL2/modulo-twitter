import 'dotenv/config'
import { CreateUsersTable1699229592456 } from 'src/migrations/1699229592456-CreateUsersTable'
import { CreateTweetsTable1699966727883 } from 'src/migrations/1699966727883-CreateTweetsTable'
import { CreateLikesTable1700228445750 } from 'src/migrations/1700228445750-CreateLikesTable'
import { CreateComentariosTable1700484798955 } from 'src/migrations/1700484798955-CreateComentariosTable'
import { CreateRetweetsTable1700571998587 } from 'src/migrations/1700571998587-CreateRetweetsTable'
import { ChangeToOptionalTweetTextField1700747294311 } from 'src/migrations/1700747294311-ChangeToOptionalTweetTextField'
import { AddDeletedFieldToTweetTable1700836738522 } from 'src/migrations/1700836738522-AddDeletedFieldToTweetTable'
import { AlterTextColumnTypeTweetTable1701260989651 } from 'src/migrations/1701260989651-AlterTextColumnTypeTweetTable'
import { Comentario } from 'src/tweets/entities/comentarios.entity'
import { Like } from 'src/tweets/entities/likes.entity'
import { Retweet } from 'src/tweets/entities/retweet.entity'
import { Tweet } from 'src/tweets/entities/tweet.entity'
import { User } from 'src/users/entities/users.entity'
import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Tweet, Like, Comentario, Retweet],
  synchronize: false,
}

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateUsersTable1699229592456,
    CreateTweetsTable1699966727883,
    CreateLikesTable1700228445750,
    CreateComentariosTable1700484798955,
    CreateRetweetsTable1700571998587,
    ChangeToOptionalTweetTextField1700747294311,
    AddDeletedFieldToTweetTable1700836738522,
    AlterTextColumnTypeTweetTable1701260989651,
  ],
})
