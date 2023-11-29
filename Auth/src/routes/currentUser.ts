import express from 'express';

const router = express.Router();

router.post('/api/users/currentuser', (req, res) => {
});

export { router as currentUserRouter };