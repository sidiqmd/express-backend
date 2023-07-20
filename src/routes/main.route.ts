import { Router } from 'express';

export const mainRoute: Router = Router();

// Health check endpoint
mainRoute.get('/health', (req, res) => {
  res.status(200).json({
    message: 'OK',
  });
});
