/**
 * Socket Controller
 */
import Debug from 'debug'
import { Socket } from 'socket.io'
import { ClientToServerEvents, NoticeData, ServerToClientEvents } from '../types/shared/SocketTypes'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('chat:socket_controller')

// Handle the user connecting
export const handleConnection = (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
	debug('🙋🏼 A user connected', socket.id)

	// Say hello to the user
	debug('👋🏻 Said hello to the user')
	socket.emit('hello')

	// Listen for room list request
	socket.on('getRoomList', async (callback) => {
		// Query database for list of rooms
		const rooms = await prisma.room.findMany()

		debug('🏨 Got request for rooms, sending room list %o', rooms)

		// Send room list
		setTimeout(() => {
			callback(rooms)
		}, 1500)
	})

	// Listen for incoming chat messages
	socket.on('sendChatMessage', (message) => {
		debug('📨 New chat message', socket.id, message)
		socket.broadcast.to(message.roomId).emit('chatMessage', message)
	})

	// Listen for a user join request
	socket.on('userJoin', async (username, roomId, callback) => {
		debug('👶🏽 User %s wants to join the room %s', username, roomId)

		// Get room from database
		const room = await prisma.room.findUnique({
			where: {
				id: roomId
			}
		})

		if (!room) {
			return callback({
				success: false,
				data: null
			})
		}

		const notice: NoticeData = {
			timestamp: Date.now(),
			username,
		}

		// Add user to room `roomId
		socket.join(roomId)

		// Create a User in the database and set roomId
		const user = await prisma.user.create({
			data: {
				id: socket.id,
				name: username,
				roomId: roomId,
			}
		})

		// Retreve a list of Users for the room
		const usersInRoom = await prisma.user.findMany({
			where: {
				roomId: roomId,
			}
		})

		// Let everyone know a new user has joined
		socket.broadcast.to(roomId).emit('userJoined', notice)

		// Let user know they're welcome
		callback({
			success: true,
			data: {
				id: roomId,
				name: room.name,
				users: usersInRoom, // Send the user the list of user in the room
			}
		})
	})

	// Handle user disconnecting
	socket.on('disconnect', async () => {
		debug('✌🏻 A user disconnected', socket.id)

		// Find room user was in if any

		const user = await prisma.user.findUnique({
			where: {
				id: socket.id
			}
		})

		if (!user) {
			return
		}

		// Remove the user from any room
		await prisma.user.delete({
			where: {
				id: socket.id
			}
		})
	})
}
