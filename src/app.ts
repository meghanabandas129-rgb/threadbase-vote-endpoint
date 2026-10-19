import express from "express";
import type { Request, Response, NextFunction } from "express";
import postsRouter from "./routes/posts";

declare global {
  namespace Express {
    interface Request {
      user?: { id: number };
    }
  }
}

const app = express();

app.use(express.json());

// Test authentication: always User 1
app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = { id: 1 };
  next();
});

app.use("/posts", postsRouter);

app.use((
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).json({
    error: "Internal server error",
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
