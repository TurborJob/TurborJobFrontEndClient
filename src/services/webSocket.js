import endpoint from "./endpoint";

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.socket = null;
  }

  connect() {
    this.socket = new SockJS("http://localhost:8077/ws");
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect({}, () => {
      console.log("Connected to WebSocket");
    });
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected from WebSocket");
  }

  sendMessage(messageContent) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(
        "/app/chat",
        {},
        JSON.stringify({ sender: 0, content: messageContent })
      );
    }
  }

  subscribeToMessages(callback) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.subscribe("/topic/messages", (response) => {
        const message = JSON.parse(response.body);
        callback(message);
      });
    }
  }

  sendPrivateMessage(senderId, recipientId, messageContent) {
    if (this.stompClient && this.stompClient.connected) {
      const privateChannel = `/app/private-message/${recipientId}`;
      this.stompClient.send(
        privateChannel,
        {},
        JSON.stringify({ sender: senderId, content: messageContent })
      );
    }
  }

  subscribeToPrivateMessages(recipientId, callback) {
    if (this.stompClient && this.stompClient.connected) {
      const privateChannel = `/topic/private-message/${recipientId}`;
      this.stompClient.subscribe(privateChannel, (response) => {
        const message = JSON.parse(response.body);
        callback(message);
      });
    }
  }

  // find job
  sendMessageFindJob(senderId, jobId, messageContent) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(
        "/app/find/job-now",
        {},
        JSON.stringify({
          sender: senderId,
          jobId: jobId,
          content: messageContent,
        })
      );
    }
  }

  subscribeToGetRequestUpdateJob(callback) {
    if (this.stompClient && this.stompClient.connected) {
        this.stompClient.subscribe("/topic/request-update-job-runtime",(response) => {
          const message = JSON.parse(response.body);
          callback(message);
        });
    }
  }

  // get apply jobs

  sendPrivateToRequestApplyJob(senderId ,jobId, messageContent) {
    if (this.stompClient && this.stompClient.connected) {
      const privateChannel = `/app/private-message/send-request-apply-job/${jobId}`;
      this.stompClient.send(
        privateChannel,
        {},
        JSON.stringify({ sender: senderId, content: messageContent })
      );
    }
  }

  subscribePrivateGetRequestApplyJob(recipientId, jobId, callback) {
    if (this.stompClient && this.stompClient.connected) {
      const privateChannel = `/topic/private-message/get-request-apply-job/${jobId}`;
      this.stompClient.subscribe(privateChannel, (response) => {
        const message = JSON.parse(response.body);
        callback(message);
      });
    }
  }

  // get request update notify

  subscribePrivateGetRequestUpdateNotify(userId, callback) {
    if (this.stompClient && this.stompClient.connected) {
      const privateChannel = `/topic/private-message/get-request-update-notify/${userId}`;
      this.stompClient.subscribe(privateChannel, (response) => {
        const message = JSON.parse(response.body);
        callback(message);
      });
    }
  }

  sendPrivateRequestUpdateNotify(recipientId, senderId, messageContent, jobId) {
    if (this.stompClient && this.stompClient.connected) {
      const privateChannel = `/app/private-message/send-request-update-notify/${recipientId}`;
      this.stompClient.send(
        privateChannel,
        {},
        JSON.stringify({ sender: senderId, content: messageContent, jobId: jobId })
      );
    }
  }
}

export default WebSocketService;
