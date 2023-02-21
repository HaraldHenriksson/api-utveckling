import './assets/scss/style.scss'
import { io, Socket } from 'socket.io-client'
import { ChatMessageData, ClientToServerEvents, ServerToClientEvents } from '@backend/types/shared/SocketTypes'

const SOCKET_HOST = import.meta.env.VITE_APP_SOCKET_HOST

const messageEl = document.querySelector('#message') as HTMLInputElement
const messageFormEl = document.querySelector('#message-form') as HTMLFormElement
const messagesEl = document.querySelector('#messages') as HTMLUListElement

// Connect to Socket.IO server
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_HOST)

// Add a message to chat
const addMessageToChat = (message: ChatMessageData, ownMessage = false) => {
	const messageEl = document.createElement('li')

	messageEl.classList.add('message')

	if (ownMessage) {
		messageEl.classList.add('own-message')
	}

	messageEl.textContent = message.content

	messagesEl.appendChild(messageEl)

	messageEl.scrollIntoView({ behavior: 'smooth' })
}

// Listen for when connection is established
socket.on('connect', () => {
	console.log('💥 Connected to the server', socket.id)
})

// Listen for when the server got tired of us
socket.on('disconnect', () => {
	console.log('💀 Disconnected from the server')
})

// Listen for when the server says hello
socket.on('hello', () => {
	console.log('👋🏻 The nice server said Hello')
})

// Listen for new chat messages
socket.on('chatMessage', (message) => {
	console.log('📨 YAY SOMEONE WROTE SOMETHING!!!!!!!', message)

	addMessageToChat(message)
})

// Send a message to the server when form is submitted
messageFormEl.addEventListener('submit', e => {
	e.preventDefault()

	if (!messageEl.value.trim()) {
		return
	}

	// Construct message payload
	const message: ChatMessageData = {
		content: messageEl.value
	}

	// Send (emit) the message to the server
	socket.emit('sendChatMessage', message)

	addMessageToChat(message, true)

	console.log("Emitted sendChatMessage to server", message)



	// Clear the inpt field and focus
	messageEl.value = ''
	messageEl.focus()

})
