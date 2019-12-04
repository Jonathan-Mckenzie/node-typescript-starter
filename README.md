# Node.js Typescript Starter

A starter app for your next node.js API project.

- Express
- Typescript
- Winston Logger
- Morgan with Winston stream
- CORS support
- JSON Body parsing
- Dotenv environment variables
- Controllers

## Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/Jonathan-Mckenzie/node-typescript-starter.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```

- Prepare the environment variables by updating `.env`
    
    `NODE_ENV`: the node environment "development" or "production"  
    `SERVER_PORT`: port that node runs on e.g. 8080  
    `WHITELIST`: comma-seprated host names, e.g."http://localhost:8080,https://postwoman.io"  
    
## Development
Launch in separate terminals:
-   `npm run watch-build`
-   `npm run watch-node`

Supports reloading on source edits

## Production
-   `npm run build`

Node script located: `dist/server.js`
    
