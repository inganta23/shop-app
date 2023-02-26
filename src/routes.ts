// import { Express, Request, Response } from 'express';
// import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler, googleOauthHandler } from './controller/session.controller';
// import { createTaskHandler, deleteTaskHandler, getAllTaskHandler, updateTaskHandler } from './controller/product.controller';
// import { createUserHandler, getCurrentUser } from './controller/user.controller';
// import requireUser from './middleware/requireUser';
// import validateResource from './middleware/validateResource';
// import { CreateSessionSchema } from './schema/session.schema';
// import { CreateTaskSchema, DeleteTaskSchema, UpdateTaskSchema } from './schema/product.schema';
// import { CreateUserSchema } from './schema/user.schema';

// function routes(app: Express) {
//     app.get('/ping', (req: Request, res: Response) => res.status(200).json({ message: 'pong' }));

//     app.get('/api/me', requireUser, getCurrentUser);
//     app.post('/api/users', validateResource(CreateUserSchema), createUserHandler);

//     app.post('/api/sessions', validateResource(CreateSessionSchema), createUserSessionHandler);
//     app.get('/api/sessions', requireUser, getUserSessionHandler);
//     app.delete('/api/sessions', requireUser, deleteSessionHandler);
//     app.get("/api/sessions/oauth/google", googleOauthHandler);

//     app.post('/api/tasks', [requireUser, validateResource(CreateTaskSchema)], createTaskHandler);
//     app.get('/api/tasks', requireUser, getAllTaskHandler);
//     app.delete('/api/tasks/:taskId', [requireUser, validateResource(DeleteTaskSchema)], deleteTaskHandler);
//     app.put(
//         "/api/tasks/:taskId",
//         [requireUser, validateResource(DeleteTaskSchema)],
//         updateTaskHandler
//       );
// }

// export default routes;
