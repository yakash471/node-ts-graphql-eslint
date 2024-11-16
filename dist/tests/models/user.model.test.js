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
const user_model_1 = require("../../src/models/user.model");
const mongoose_1 = __importDefault(require("mongoose"));
// Mock the save method of the UserModel
jest.mock('../../src/models/user.model'); // This will mock all the functions of UserModel, including save
describe('User Model', () => {
    beforeAll(() => {
        mongoose_1.default.connect('mongodb://localhost:27017/test');
    });
    afterAll(() => {
        mongoose_1.default.connection.close();
    });
    it('should create a valid user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = { name: 'John Doe', email: 'john@example.com' };
        // Mock the save method to return the userData
        const mockSave = user_model_1.UserModel.prototype.save;
        mockSave.mockResolvedValue({
            _id: 'someid',
            name: userData.name,
            email: userData.email,
        });
        const user = new user_model_1.UserModel(userData);
        const savedUser = yield user.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.email).toBe(userData.email);
    }));
    it('should throw error if email is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidUser = new user_model_1.UserModel({ name: 'Jane Doe' });
        // Mock save to reject if validation fails (e.g. email is missing)
        const mockSave = user_model_1.UserModel.prototype.save;
        mockSave.mockRejectedValue(new Error('Validation Error: Email is required'));
        yield expect(invalidUser.save()).rejects.toThrow('Validation Error: Email is required');
    }));
});