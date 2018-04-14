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
  // console.log('New message', message);
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = document.getElementById('message-template').innerHTML
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  let htmlParsed = document.createRange().createContextualFragment(html);

  document.getElementById('messages').appendChild(htmlParsed);

  // let formattedTime = moment(message.createdAt).format('h:mm a');
  // let li = document.createElement('li');
  // li.textContent = `${message.from} ${formattedTime}: ${message.text}`;
  //
  // document.getElementById('messages').appendChild(li);
});

socket.on('newLocationMessage', (message) => {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = document.getElementById('location-message-template').innerHTML
  let html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  let htmlParsed = document.createRange().createContextualFragment(html);

  document.getElementById('messages').appendChild(htmlParsed);

  // let formattedTime = moment(message.createdAt).format('h:mm a');
  // let li = document.createElement('li');
  // let a = document.createElement('a')
  // a.textContent = 'My current location';
  // a.setAttribute('target', '_blank');
  //
  // li.textContent = `${message.from} ${formattedTime}: `;
  // a.setAttribute('href', message.url);
  // li.appendChild(a);
  // document.getElementById('messages').appendChild(li);
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
    document.getElementsByName('message')[0].value = '';
  });
});

let locationButton = document.getElementById('send-location');
locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.setAttribute('disabled', 'disabled');
  locationButton.textContent = 'Sending location...';

  navigator.geolocation.getCurrentPosition((position) => {
    locationButton.removeAttribute('disabled');
    locationButton.textContent = 'Send Location';
    // console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    locationButton.removeAttribute('disabled');
    locationButton.textContent = 'Send Location';
    alert('Unable to fetch location');
  });
});
