let ws: WebSocket | null = null;
let sequence = 1;

export function disconnectWebSocket(topicId: string, jwt: string | null) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    const packet = { type: 'close', topicId: topicId, jwt: jwt };
    ws.send(JSON.stringify(packet));
    ws!.close();
    console.log('WebSocket connection closing...');
  } else {
    console.log('WebSocket is not connected.');
  }
}

export function connectWebSocket() {
  if (!ws || ws.readyState === WebSocket.CLOSED) {
    ws = new WebSocket('ws://localhost:8000/ecg');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onmessage = (event) => {
      console.log('Received message:', event.data);

      try {
        sequence = parseInt(event.data);
      } catch (e) {
        console.error('Failed to parse message:', e);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      ws = null;
      sequence = 1;
    };
  } else {
    console.log('WebSocket is already connected or connecting.');
  }
}

export function sendECGData(data: any, topicId: string) {
  const packet = { type: 'ecg ', ECGPlot: data, topicId: topicId, sequence: sequence }; 
  try {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(packet));
    }
  } catch (error) {
    console.error('Failed to send message:', error);
  }
}
