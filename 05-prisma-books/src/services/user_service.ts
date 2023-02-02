/*
* User Service
 */

import prisma from "../prisma"

export const getUserByEmail = async (email: string) => {
	// check if a User with that emailalready exists
	return await prisma.user.findUnique({
		where:{
			email: email,
		}
	})
}
