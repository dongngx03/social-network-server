"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = __importDefault(require("../../controllers/message/message.controller"));
const router = (0, express_1.Router)();
router.post('/', message_controller_1.default.sendMessage); // send message 
router.delete('/:id', message_controller_1.default.deleteMessage);
router.post('/get-all-box-chat', message_controller_1.default.getAllMessageFromBoxChat);
exports.default = router;
