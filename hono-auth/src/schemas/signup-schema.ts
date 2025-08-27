import { zValidator } from "@hono/zod-validator";
import { password } from "bun";
import { email, z } from 'zod';

export const signupSchema = z.object({
    email: z.email(),
    password: z
    .string()
    .min(10, "password must be at least 10 charecters")
});

export const signupValidator = zValidator('json', signupSchema, (result, c) => {
    if (!result.success) {
        return c.json(
            {
                erorrs: result.error.issues.map((issue)=> issue.message)
            }
        )
    }
});