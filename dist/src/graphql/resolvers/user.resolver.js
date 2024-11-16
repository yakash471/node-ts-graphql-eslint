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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const user_model_1 = require("../../models/user.model");
exports.userResolvers = {
    Query: {
        users: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield user_model_1.UserModel.find();
        }),
        user: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            return yield user_model_1.UserModel.findById(id);
        }),
    },
    Mutation: {
        createUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { name, email }) {
            const newUser = new user_model_1.UserModel({ name, email });
            return yield newUser.save();
        }),
        updateUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, name, email }) {
            return yield user_model_1.UserModel.findByIdAndUpdate(id, { name, email }, { new: true });
        }),
        deleteUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            yield user_model_1.UserModel.findByIdAndDelete(id);
            return `User with ID ${id} deleted`;
        }),
    },
};
