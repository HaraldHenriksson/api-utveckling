/*
* User Service
 */

import { stringify } from "querystring"
import prisma from "../prisma"
import { CreateAuthorData, CreateUserData } from "../types"


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

export const createUser = async (data: CreateUserData) => {
	return await prisma.user.create({
		data: data,
	})
}
