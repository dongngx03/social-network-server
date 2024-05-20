"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const socket_controller_1 = __importDefault(require("../../controllers/socket/socket.controller"));
const socketRouter = (0, express_1.Router)();
socketRouter.delete('/:id', socket_controller_1.default.delete);
exports.default = socketRouter;
