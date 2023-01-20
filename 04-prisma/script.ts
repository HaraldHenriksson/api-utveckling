import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const main = async () => {
    // Write Prisma Client queries here
    console.log("It works?")

	//const phones = await prisma.phones.findMany({    // SELECT manufacturer, model FROM phones
		// select: {
		// 	manufacturer: true,
		// 	model: true,
		// 	imei: true,
		// },
		// where: {
		// 	manufacturer: "Apple"
		// },

		  const user = await prisma.users.findMany({
		  	where: {
				name: {
					contains: "an",
				},
		  	},
			orderBy: [
				{
				name: 'asc',
				},
				{
					id: 'desc'
				}
		],
		take: 2,
		skip: 1,
		  })

	// Get a specific user
// 	const users = await prisma.users.findUnique({
// 		where: {
// 			id: 4,
// 		}
// 	})
 	console.log("User:", user)
// }
		// console.log("User:", users)

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async e => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })


