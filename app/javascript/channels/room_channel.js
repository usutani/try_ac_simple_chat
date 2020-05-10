import consumer from "./consumer"

const roomChannel = consumer.subscriptions.create("RoomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    const el = document.getElementById('messages')
    el.insertAdjacentHTML('beforeend', data)
  },

  speak(message) {
    return this.perform('speak', { message: message })
  },
});

document.addEventListener('turbolinks:load', () => {
  const el = document.querySelector('[data-behavior~=room_speaker]')
  el.addEventListener('keypress', event => {
    if (event.keyCode == 13) {
      roomChannel.speak(event.target.value)
      event.target.value = ''
      event.preventDefault()
    }
  })
})
