const webSockets = {};

const addWebSocket = webSocket => {
  webSockets[webSocket._socket.remoteAddress] = webSocket;
};

const removeWebSocket = remoteAddress => {
  // delete webSockets[remoteAddress];
};

const getAllWebSockets = () => {
  return webSockets;
};

export {
  addWebSocket,
  removeWebSocket,
  getAllWebSockets
};
