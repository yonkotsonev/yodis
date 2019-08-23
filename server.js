const memory = require('./memory');
const net = require('net');
const command = require('./command');

const server = net.createServer((c) => {
    c.on('data', (data) => {
        let com = new command.Command(data.toString());
        if (com.isValid()) {
            c.write(`:${ com.execute(memory) }`);
        } else {
            c.write('Invalid Command: ' + com.show());
        }
    });

    c.on('end', (data) => {
        console.log("Disconnected!");
    })
});

server.on('error', (err) => {
    throw err;
});

server.listen(7890, () => {
    console.log('Yodis listens to port 7890!');
});
