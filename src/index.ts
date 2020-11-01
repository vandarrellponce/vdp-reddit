import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants'
import { Post } from './entities/Post'
import mikroOrmConfig from './mikro-orm.config'

const main = async () => {
	try {
		// connect to database
		const orm = await MikroORM.init(mikroOrmConfig)

		// create command for postgresql - create table
		// 1. add mikro-orm config to package.json,
		// 2. create mikro-orm.config.ts,
		// 3. run npx mikro-orm migration:create)
		await orm.getMigrator().up()

		// create post object
		const post = orm.em.create(Post, { title: 'My first vdp post' })

		// save post object
		await orm.em.persistAndFlush(post)

		const posts = await orm.em.find(Post, {})
		console.log(posts)
	} catch (error) {
		console.log(error.message)
	}
}

main()
