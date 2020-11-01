import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants'
import { Post } from './entities/Post'
import mikroOrmConfig from './mikro-orm.config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello'

const main = async () => {
	try {
		const orm = await MikroORM.init(mikroOrmConfig)
		await orm.getMigrator().up()

		const app = express()
		const apolloServer = new ApolloServer({
			schema: await buildSchema({
				resolvers: [HelloResolver],
				validate: false,
			}),
		})

		apolloServer.applyMiddleware({ app })

		const PORT = process.env.PORT || 5000
		app.listen(PORT, () => {
			console.log('Listening on localhost port ' + PORT)
		})
	} catch (error) {
		console.log(error.message)
	}
}

main()
