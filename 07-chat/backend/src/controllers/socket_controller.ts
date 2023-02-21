/**
 * Socket Controller
 */
import Debug from 'debug'
import { Socket } from 'socket.io'
import { ClientToServerEvents, ServerToClientEvents } from '../types/shared/SocketTypes'

// Create a new debug instance
const debug = Debug('chat:socket_controller')

// Handle the user socket connection
export const handleConnection = (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
	debug('👋 A user connected', socket.id)

	// Say hello to the user
	socket.emit('hello')

	// Handle user disconnecting
	socket.on('disconnect', () => {
		debug('🚶 A user disconnected', socket.id)
	})
}
