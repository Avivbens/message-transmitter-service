# NestJS Transmitter service

## Dependencies

<br>

### redis-server package is mandatory

```bash
brew install redis-server
```

### ttab package is mandatory

```bash
npm install -g ttab
```

<hr>
<br>

## Init

### run the follow command to init the project

```bash
npm run start:tester
```

<br>
<hr>
<br>

## Tetsing

<br>
Enter <a href="http://localhost:3001/api">OpenAPI</a> for Node1
<br>
Enter <a href="http://localhost:3002/api">OpenAPI</a> for Node2

<br>

### Connect to WS via Postman to both nodes:

http://localhost:3001
<br>
http://localhost:3002
<br>

Subscribe to event name:

```
message
```

<br>
Use the `create-session-token` endpoint to create session token, use it's value in the `Authorize` button in the top right corner of the OpenAPI page.
<br>
<br>
Execute the API endpoints as you wish
