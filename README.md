# PingOne MPC Server

A Multi-Party Computation (MPC) server designed to work with the PingOne OAuth Playground application, providing secure cryptographic computations across multiple participants.

## 🚀 Features

- **Multi-Party Computation**: Secure computation across multiple participants
- **Real-time Communication**: WebSocket support for live updates
- **PingOne Integration**: Seamless integration with PingOne OAuth Playground
- **RESTful API**: Clean API endpoints for MPC operations
- **Simple Setup**: Easy to run and test

## 📋 Supported MPC Operations

- **Addition**: Secure addition of multiple values
- **Multiplication**: Secure multiplication of multiple values
- **Comparison**: Secure comparison between values

## 🛠️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/curtismu7/PingOne_mpc.git
   cd PingOne_mpc
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

## 📡 API Endpoints

### Health Check
```http
GET /health
```

### MPC Computation
```http
POST /api/mpc/compute
Content-Type: application/json

{
  "computationId": "unique-id",
  "participants": ["participant1", "participant2"],
  "operation": "add",
  "inputs": [10, 20, 30]
}
```

## 🔌 WebSocket API

Connect to `ws://localhost:3001/ws` for real-time communication.

## 🔗 PingOne OAuth Playground Integration

This MPC server is designed to work seamlessly with the PingOne OAuth Playground application.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start

# Test the server
curl http://localhost:3001/health
```

## 📄 License

MIT License

---

**Built for PingOne OAuth Playground** - Secure Multi-Party Computation made simple.
