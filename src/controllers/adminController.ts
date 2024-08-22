import { Request, Response } from 'express';

export const someAdminFunction = (req: Request, res: Response) => {
    res.json({ message: 'Admin functionality executed successfully' });
};
