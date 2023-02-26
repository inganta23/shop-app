Please install package in backend and frontend berfore run the system
- backend is in the root folder
- frontend is inside root folder (ex: ```shop-app/frontend```)
- goto root folder (```chat-socket/shop-app```): ```pnpm add .``` or use your package manager.
- open frontend folder ```/frontend```(```cd frontend```): ```pnpm add .``` .
- run system 

The basic setting (mongo_uri, jwt_secret etc) is in ```config/default.ts``` .
I exposed the config folder on purpose so you can use the app easily. But if you want to reconfigure the setting, feel free to change the ```config/default.ts``` file.

shop-app is made using MERN (MongoDB, Express, React, Node) and Typescript
