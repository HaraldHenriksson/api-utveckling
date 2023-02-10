/*
* User Service
 */

import { stringify } from "querystring"
import prisma from "../prisma"
import { CreateAuthorData, CreateUserData, updateUserData } from "../types"


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

/**
 * Create a user
 *
 * @param data
 * @returns
 */
export const createUser = async (data: CreateUserData) => {
	return await prisma.user.create({
		data: data,
	})
}

/**
 * Update user data
 *
 * @param userId
 * @param userData
 * @returns
 */
export const updateUser = async (userId: number, userData:  updateUserData) => {
	return await prisma.user.update({
		where: {
			id: userId,
		},
		data: userData,
	})
}
