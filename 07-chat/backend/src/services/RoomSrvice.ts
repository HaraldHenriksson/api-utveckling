/**
 * Room Service
 */


import prisma from "../prisma"

/**
 * Get list of all rooms.
 */
export const getRooms = () => {
	return prisma.room.findMany()
}

/**
 * Get a single room
 *
 * @param roomId ID of room to get
 */
export const getRoom = (roomId: string) => {
	const now = Date.now()
	const past = now - (10 * 60 * 1000)
	return prisma.room.findUnique({
		where: {
			id: roomId,
		},
		include: {
			messages: {
				where: {
					timestamp: {
						gte: past,    // WHERE timestamp >=
					}
				},
				// orderBy: {
				// 	timestamp: 'desc'
				// },
				take: -5,
			},
		}
	})
}
