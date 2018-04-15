import { parse, build } from './libs/search-params.js';

const socket = io();

const scrollToBottom = () => {
  // Selectors
  let messages = document.getElementById('messages');
  let newMessage = messages.lastElementChild;
  // Heights
  let clientHeight = messages.clientHeight;
  let scrollTop = messages.scrollTop;
  let scrollHeight = messages.scrollHeight;
  let newMessageHeight = newMessage.clientHeight;
  let lastMessage = newMessage.previousElementSibling;
  let lastMessageHeight;
  if (lastMessage) {
    lastMessageHeight = lastMessage.clientHeight;
  }

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop = scrollHeight;
  }
};

socket.on('connect', () => {
  // console.log('Connected to server');
  const params = parse(window.location.search);
  // console.log(params);

  socket.emit('join', params, (err) => {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });

  // socket.emit('createMessage', {
  //   to: 'Alice',
  //   text: 'Hey there!'
  // });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('updateUserList', (users) => {
  const ol = document.createElement('ol');

  users.forEach((user) => {
    let li = document.createElement('li');
    li.textContent = user;
    ol.appendChild(li);
  });

  document.getElementById('users').innerHTML = ol.outerHTML;
});

socket.on('newMessage', (message) => {
  // console.log('New message', message);
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = document.getElementById('message-template').innerHTML
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  const htmlParsed = document.createRange().createContextualFragment(html);

  document.getElementById('messages').appendChild(htmlParsed);

  scrollToBottom();

  // let formattedTime = moment(message.createdAt).format('h:mm a');
  // let li = document.createElement('li');
  // li.textContent = `${message.from} ${formattedTime}: ${message.text}`;
  //
  // document.getElementById('messages').appendChild(li);
});

socket.on('newLocationMessage', (message) => {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = document.getElementById('location-message-template').innerHTML
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  const htmlParsed = document.createRange().createContextualFragment(html);

  document.getElementById('messages').appendChild(htmlParsed);

  scrollToBottom();

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
    text: document.getElementsByName('message')[0].value
  }, () => {
    document.getElementsByName('message')[0].value = '';
  });
});

const locationButton = document.getElementById('send-location');
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
