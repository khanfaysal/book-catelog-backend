/*
* - [ ]  Route: /api/v1/orders/create-order (POST)(Only Customer)
- [ ]  Route: /api/v1/orders (GET)(O A)
- [ ]  Route: /api/v1/orders (GET)(Own order)
- [ ]  Route: /api/v1/orders/:orderId (Get)(Only order owner and admin)
* */

import {Router} from "express";
import {OrderController} from "@/App/modules/Order/order.controller";
import {UserMiddleware} from "@/App/modules/User/user.middlewares";
import AccessOnly from "@/Middlewares/AccessLimit";

const OrderRoutes = Router()

OrderRoutes
    .get(
        '/',
        UserMiddleware.validateAccess,
        AccessOnly(['admin', 'customer']),
        OrderController.getAllOrders
    )
    .get(
        '/:id',
        UserMiddleware.validateAccess,
        AccessOnly(['admin', 'customer']),
        OrderController.getSingleOrder)
    .post(
        '/create-order',
        UserMiddleware.validateAccess,
        AccessOnly(['customer']),
        OrderController.newOrder
    )
export default OrderRoutes