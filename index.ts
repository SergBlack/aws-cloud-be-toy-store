import net from 'net';

const server = net.createServer();
const PORT = Number(process.env.PORT) || 9000;

server.listen(PORT, 'localhost', 2);
server.on('listening', () => {
  console.log('Server accepting connections');
});

server.on('connection', (socket) => {
  console.log('Client connected\n');

  socket.write('Hello there!\n');

  socket.on('data', data => {
    console.log(data.toString());
  });

  socket.pipe(socket);

  setTimeout(() => {
    socket.end('Connection close');
  }, 2000);
});
