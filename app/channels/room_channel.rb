class RoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from 'room_channel'
    stream_from 'room:message'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    # ActionCable.server.broadcast 'room_channel', message: data['message']
    # RoomChannel.broadcast_to('message', data)
    Message.create! content: data['message']
  end
end
