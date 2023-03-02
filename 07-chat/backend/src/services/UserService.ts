/**
 * User service
 */
import prisma from "../prisma"

export const getUsersInRoom = (roomId: string) => {
	const rooms = prisma.user.findMany({
		where: {
			roomId: roomId,
		}
	})

	return rooms
}

export const deleteAllUsers = () => {
	return prisma.user.deleteMany()
}
