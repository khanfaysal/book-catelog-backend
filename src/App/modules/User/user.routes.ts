/* 
- [ ]  Route: /api/v1/users (GET)(ONLY ADMIN)
- [ ]  Route: /api/v1/users/:id (GET)(ONLY ADMIN)
- [ ]  Route: /api/v1/users/:id (PATCH)(O A)
- [ ]  Route: /api/v1/users/:id ( DELETE)(O A)
*/

import {Router} from "express";
import {UserController} from "@/App/modules/User/user.controller";
import {UserMiddleware} from "@/App/modules/User/user.middlewares";
import AccessOnly from "@/Middlewares/AccessLimit";

const UserRoutes = Router()

UserRoutes
    .get('/',
        AccessOnly(['admin']),
        UserController.getAllUsers
    )
    .get('/:id',
        UserMiddleware.userExists,
        AccessOnly(['admin']),
        UserController.getSingleUser
    )
    .patch('/:id',
        UserMiddleware.userExists,
        AccessOnly(['admin']),
        UserController.updateUser
    )
    .delete('/:id',
        UserMiddleware.userExists,
        AccessOnly(['admin']),
        UserController.deleteUser
    )

export default UserRoutes