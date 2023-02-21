import './assets/scss/style.scss'
import { io, Socket} from 'socket.io-client'

const SOCKET_HOST = import.meta.env.VITE_APP_SOCKET_HOST

const messageEl = document.querySelector('#message') as HTMLInputElement
const messageFormEl = document.querySelector('#message-form') as HTMLFormElement
const messagesEl = document.querySelector('#messages') as HTMLDivElement

// Connect to Socket.Io server
const socket =io(SOCKET_HOST)

// Listen for when connection is extablished
socket.on('connect', () => {
	console.log('💥 Connected to server', socket.id)
})

// Listen for when the server got tired of us
socket.on('disconnect', () => {
	console.log('☠ Disconnected from the server', socket.id)
})
