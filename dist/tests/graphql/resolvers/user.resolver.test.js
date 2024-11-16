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
const user_resolver_1 = require("../../../src/graphql/resolvers/user.resolver");
const user_model_1 = require("../../../src/models/user.model");
const mongoose_1 = __importDefault(require("mongoose"));
// Mock the UserModel before running tests
jest.mock('../../../src/models/user.model');
// Type casting for the Mongoose methods to allow Jest mocks
const mockedFind = user_model_1.UserModel.find;
const mockedFindById = user_model_1.UserModel.findById;
const mockedSave = user_model_1.UserModel.prototype.save;
const mockedFindByIdAndUpdate = user_model_1.UserModel.findByIdAndUpdate;
const mockedFindByIdAndDelete = user_model_1.UserModel.findByIdAndDelete;
describe('User Resolvers', () => {
    // Mock connection before tests (optional, can be skipped if you're not testing DB)
    beforeAll(() => {
        mongoose_1.default.connect('mongodb://localhost:27017/test');
    });
    afterAll(() => {
        mongoose_1.default.connection.close();
    });
    it('should fetch all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUsers = [
            { _id: '1', name: 'John Doe', email: 'john@example.com' },
            { _id: '2', name: 'Jane Doe', email: 'jane@example.com' },
        ];
        // Mock the find method to return the mock data
        mockedFind.mockResolvedValue(mockUsers);
        const result = yield user_resolver_1.userResolvers.Query.users();
        expect(result).toEqual(mockUsers);
    }));
    it('should fetch a single user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = { _id: '1', name: 'John Doe', email: 'john@example.com' };
        // Mock findById method to return the mock user
        mockedFindById.mockResolvedValue(mockUser);
        const result = yield user_resolver_1.userResolvers.Query.user(null, { id: '1' });
        expect(result).toEqual(mockUser);
    }));
    it('should create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = { _id: '3', name: 'Alice', email: 'alice@example.com' };
        // Mock save method
        mockedSave.mockResolvedValue(mockUser);
        const result = yield user_resolver_1.userResolvers.Mutation.createUser(null, {
            name: 'Alice',
            email: 'alice@example.com',
        });
        expect(result).toEqual(mockUser);
    }));
    it('should update a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedUser = {
            _id: '1',
            name: 'John Updated',
            email: 'john.updated@example.com',
        };
        // Mock findByIdAndUpdate method
        mockedFindByIdAndUpdate.mockResolvedValue(updatedUser);
        const result = yield user_resolver_1.userResolvers.Mutation.updateUser(null, {
            id: '1',
            name: 'John Updated',
            email: 'john.updated@example.com',
        });
        expect(result).toEqual(updatedUser);
    }));
    it('should delete a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = '1';
        // Mock findByIdAndDelete method
        mockedFindByIdAndDelete.mockResolvedValue(true);
        const result = yield user_resolver_1.userResolvers.Mutation.deleteUser(null, {
            id: userId,
        });
        expect(result).toBe(`User with ID ${userId} deleted`);
    }));
});
