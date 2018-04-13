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

  let li = document.createElement('li');
  li.textContent = `${message.from}: ${message.text}`;

  document.getElementById('messages').appendChild(li);
});

socket.on('newLocationMessage', (message) => {
  let li = document.createElement('li');
  let a = document.createElement('a')
  a.textContent = 'My current location';
  a.setAttribute('target', '_blank');

  li.textContent = `${message.from}: `;
  a.setAttribute('href', message.url);
  li.appendChild(a);
  document.getElementById('messages').appendChild(li);
});

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi'
// }, (data) => {
//   console.log('Got it', data);
// });

document.getElementById('message-form').addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: document.getElementsByName('message')[0].value
  }, () => {

  });
});

let locationButton = document.getElementById('send-location');
locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition((position) => {
    // console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    alert('Unable to fetch location');
  });
});
