import { rest } from "msw";
const { TextEncoder, TextDecoder } = require('util');

export const handlers = [
    rest.post('http://localhost:5000/api/login', (req, res, ctx) => {
        const { username, password } = req.body;

        if (username === 'testuser' && password === 'testpassword00') {
            return res(
                ctx.json({
                    token: 'mock-jwt-token',
                })
            );
        } else {
            return res(
                ctx.status(401),
                ctx.json({
                    error: 'Invalid username or password',
                })
            );
        }
    }),
];
