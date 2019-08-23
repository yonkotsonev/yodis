const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'YODIS:7890> '
});

const client = net.createConnection({ port: 7890 }, () => {
    rl.prompt();

    rl.on('line', (line) => {
        line = line.trim();
        if (line === 'exit') return rl.close();

        client.write(line);
    })
    .on('close', () => {
        client.end();
    });
});

client.on('data', (data) => {
    console.log(data.toString());
    rl.prompt();
});

client.on('end', () => {
    console.log('Disconnected!');
    process.exit(0);
});
