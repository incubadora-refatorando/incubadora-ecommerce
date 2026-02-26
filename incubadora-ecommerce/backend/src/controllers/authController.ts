import { Request, Response } from "express";
import { z } from "zod";
import {
	createUser,
	findUserByEmail,
	findUserById,
	verifyPassword,
	excludePassword,
} from "../models/userModel";
import { generateToken } from "../utils/jwt";
import { LoginRequest, RegisterRequest } from "../types";

const loginSchema = z.object({
	email: z.string().email("Invalid email format"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
	email: z.string().email("Invalid email format"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	name: z.string().optional(),
});

export const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const validation = loginSchema.safeParse(req.body);

		if (!validation.success) {
			res.status(400).json({
				error: "Validation error",
				details: validation.error.errors,
			});
			return;
		}

		const { email, password }: LoginRequest = validation.data;

		const user = await findUserByEmail(email);

		if (!user) {
			res.status(401).json({ error: "Invalid credentials" });
			return;
		}

		const isPasswordValid = await verifyPassword(password, user.password_hash);

		if (!isPasswordValid) {
			res.status(401).json({ error: "Invalid credentials" });
			return;
		}

		const token = generateToken({
			userId: user.id,
			email: user.email,
			role: user.role,
		});

		const userResponse = excludePassword(user);

		res.status(200).json({
			token,
			user: userResponse,
		});
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const register = async (req: Request, res: Response): Promise<void> => {
	try {
		const validation = registerSchema.safeParse(req.body);

		if (!validation.success) {
			res.status(400).json({
				error: "Validation error",
				details: validation.error.errors,
			});
			return;
		}

		const { email, password, name }: RegisterRequest = validation.data;

		const existingUser = await findUserByEmail(email);

		if (existingUser) {
			res.status(400).json({ error: "Email already registered" });
			return;
		}

		const newUser = await createUser(email, password, name);

		const token = generateToken({
			userId: newUser.id,
			email: newUser.email,
			role: newUser.role,
		});

		res.status(201).json({
			token,
			user: newUser,
		});
	} catch (error) {
		console.error("Register error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.user) {
			res.status(401).json({ error: "Not authenticated" });
			return;
		}

		const user = await findUserById(req.user.userId);

		if (!user) {
			res.status(404).json({ error: "User not found" });
			return;
		}

		res.status(200).json(user);
	} catch (error) {
		console.error("Get me error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
