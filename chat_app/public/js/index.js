const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  // socket.emit('createMessage', {
  //   to: 'Alice',
  //   text: 'Hey there!'
  // });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  console.log('New message', message);
});

socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi'
}, (data) => {
  console.log('Got it', data);
});
