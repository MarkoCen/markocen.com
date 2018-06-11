import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/greetings', (req: Request, res: Response) => {
    res.end('hello there')
})

export default router;