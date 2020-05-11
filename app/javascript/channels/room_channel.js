import consumer from "./consumer"

const roomChannel = consumer.subscriptions.create("RoomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    alert(data['message'])
  },

  speak(message) {
    return this.perform('speak', { message: message })
  },
});

document.addEventListener('turbolinks:load', () => {
  const els = document.querySelectorAll('[data-behavior~=room_speaker]')
  els.forEach(el => {
    el.addEventListener('keypress', event => {
      if (event.keyCode === 13) {
        roomChannel.speak(event.target.value)
        event.target.value = ''
        event.preventDefault()
      }
    })
  })
})
