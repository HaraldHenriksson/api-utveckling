import './assets/scss/style.scss'
import { io, Socket } from 'socket.io-client'
import { ChatMessageData, ClientToServerEvents, ServerToClientEvents } from '@backend/types/shared/SocketTypes'

const SOCKET_HOST = import.meta.env.VITE_APP_SOCKET_HOST

const messageEl = document.querySelector('#message') as HTMLInputElement
const messageFormEl = document.querySelector('#message-form') as HTMLFormElement
const userNameFormEl = document.querySelector('#username-form') as HTMLFormElement

const messagesEl = document.querySelector('#messages') as HTMLUListElement

const startEl = document.querySelector('#start') as HTMLDivElement
const chatWrapperEl = document.querySelector('#chat-wrapper') as HTMLDivElement

// User Details
let username: string | null = null

// Connect to Socket.IO server
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_HOST)

// Add a message to chat
const addMessageToChat = (message: ChatMessageData, ownMessage = false) => {
	const messageEl = document.createElement('li')

	messageEl.classList.add('message')

	if (ownMessage) {
		messageEl.classList.add('own-message')
	}

	messageEl.innerHTML = ownMessage
	? `<span class="content">${message.content}</span>`
	: `<span class="user">${message.username}</span><span class="content">${message.content}</span>`


	messagesEl.appendChild(messageEl)

	messageEl.scrollIntoView({ behavior: 'smooth' })
}

// Show chat view
const showChatView = () => {
	startEl.classList.add('hide')
	chatWrapperEl.classList.remove('hide')
}

// Show welcome view
const showWelcomeview = () => {
	chatWrapperEl.classList.add('hide')
	startEl.classList.remove('hide')
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

	if (!messageEl.value.trim() || !username) {
		return
	}

	// Construct message payload
	const message: ChatMessageData = {
		content: messageEl.value,
		timestamp: Date.now(),
		username: username,
	}

	// Send (emit) the message to the server
	socket.emit('sendChatMessage', message)

	addMessageToChat(message, true)

	console.log("Emitted sendChatMessage to server", message)



	// Clear the inpt field and focus
	messageEl.value = ''
	messageEl.focus()

})

// Get username from form and hte show chat
 userNameFormEl.addEventListener('submit', e => {
	e.preventDefault()

	username = (userNameFormEl.querySelector('#username') as HTMLInputElement).value.trim()

	// If no username, no chat for you
	if (!username) {
		return
	}

	// Show chat view
	showChatView()
})
