import { Request, Response, Router } from 'express';
import UserController from './UserController';

export default class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.setRoutes();
    }

    // set up our routes
    public setRoutes() {
        this.router.get('/', this.getAllUsers);
        this.router.get('/:username', this.getUserByUsername);
        this.router.post('/', this.create);
        this.router.put('/:username', this.update);
        this.router.delete('/:username', this.delete);
    }

    public getAllUsers(req: Request, res: Response): void {
        new UserController().getAll((status:number, data: any) => res.status(status).json(data));
    }

    public getUserByUsername(req: Request, res: Response): void {
        new UserController().getByUsername(req.params.username, (status:number, data: any) => res.status(status).json(data));
    }

    public create(req: Request, res: Response): void {
        new UserController().create(req.body, (status: number, data: any) => res.status(status).json(data));
    }

    public update(req: Request, res: Response): void {
        new UserController().update(req.params.username, req.body, (status: number, data: any) => res.status(status).json(data));
    }

    public delete(req: Request, res: Response): void {
        new UserController().delete(req.params.username, (error) => {
            if(error) {
                res.status(500).json(error);
            } else {
                res.status(204).end();
            }
        });
    }
}