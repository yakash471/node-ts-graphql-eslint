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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const connection_1 = require("./database/connection");
const schema_1 = require("./graphql/schema");
const user_resolver_1 = require("./graphql/resolvers/user.resolver");
const subgraph_1 = require("@apollo/subgraph");
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.app = app;
// Connect to MongoDB
(0, connection_1.connectToDatabase)().catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
});
// Set up Apollo Server
const server = new server_1.ApolloServer({
    schema: (0, subgraph_1.buildSubgraphSchema)({ typeDefs: schema_1.typeDefs, resolvers: user_resolver_1.userResolvers }),
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Start the Apollo Server
        yield server.start();
        // Apply Apollo Middleware to Express app
        app.use('/graphql', (0, cors_1.default)({
            origin: '*',
        }), express_1.default.json(), (0, express4_1.expressMiddleware)(server));
        // Start the Express server
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Error starting Apollo Server:', error);
    }
});
startServer();
