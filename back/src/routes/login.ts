import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const loginRouter = Router();
const prisma = new PrismaClient();
const SECRET_KEY = "PSEUDOKEY";

// Implement authentication
loginRouter.post("/login", async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });

        return res.status(200).json({ token, name:user.name, nickname: user.nickname, email: user.email });
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
});

export default loginRouter;
