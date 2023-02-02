/*
* User Service
 */

import prisma from "../prisma"


/**
 *
 * @param email  The email of the use to get
 * @returns
 */
export const getUserByEmail = async (email: string) => {
	// check if a User with that emailalready exists
	return await prisma.user.findUnique({
		where:{
			email: email,
		}
	})
}
