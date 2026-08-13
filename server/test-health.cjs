const http = require('http');
const req = http.request({ hostname: 'localhost', port: 5000, path: '/api/health', method: 'GET' }, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
});
req.end();
