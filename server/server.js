import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

let pendingRequests = [];

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('newRideRequest', (request) => {
    console.log('New ride request received:', request);
    pendingRequests.push({ ...request, socketId: socket.id });
    io.emit('rideRequestForSecretary', request);
  });

  socket.on('priceUpdated', (updatedRequest) => {
    console.log('Price updated:', updatedRequest);
    pendingRequests = pendingRequests.map(req =>
      req.id === updatedRequest.id ? { ...req, price: updatedRequest.price } : req
    );
    io.emit('rideRequestForDrivers', updatedRequest);
  });

  socket.on('driverAccepted', (requestId) => {
    console.log('Driver accepted request:', requestId);
    const request = pendingRequests.find(req => req.id === requestId);
    if (request) {
      io.to(request.socketId).emit('driverFound', { driverId: socket.id });
      io.emit('rideRequestClosed', requestId);  // יידע את כל הנהגים והמזכירה שהבקשה נסגרה
      pendingRequests = pendingRequests.filter(req => req.id !== requestId);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});