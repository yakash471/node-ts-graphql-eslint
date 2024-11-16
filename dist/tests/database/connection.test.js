"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../../src/database/connection");
const mongoose_1 = __importDefault(require("mongoose"));
describe('MongoDB Connection', () => {
    it('should connect to MongoDB', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, connection_1.connectToDatabase)()).resolves.not.toThrow();
        expect(mongoose_1.default.connection.readyState).toBe(1); // 1 means connected
    }));
});
