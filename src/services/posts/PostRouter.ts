import { Request, Response, Router } from 'express';
import PostModel from './PostModel';
import PostController from './PostController';


export default class PostRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.setRoutes();
    }

    public setRoutes() {
        this.router.get('/', this.getAllPosts);
        this.router.get('/:slug', this.getPostBySlug);
        this.router.post('/', this.create);
        this.router.put('/:slug', this.update);
        this.router.delete('/:slug', this.delete);
    }

    // get all of the posts in the database
    public getAllPosts(req: Request, res: Response): void {
        new PostController().getAllPosts((statusCode, data) => {
            const status = res.statusCode;
            res.status(statusCode).json({status, data});
        });
    }

    // get a single post by params of 'slug'
    public getPostBySlug(req: Request, res: Response): void {
        new PostController().getPostBySlug(req.params.slug, (statusCode, data) => res.status(statusCode).json(data));
    }

    // create a new post
    public create(req: Request, res: Response): void {
        new PostController().create(req.body, (statusCode, data) => res.status(statusCode).json(data));
    }

    // update post by params of 'slug'
    public update(req: Request, res: Response): void {
        new PostController().update(req.body.slug, req.body, (statusCode, data) => res.status(statusCode).json(data));
    }

    // delete post by params of 'slug'
    public delete(req: Request, res: Response): void {
        const slug: string = req.body.slug;
        new PostController().delete(slug, (err) => {
            if(err) {
                res.status(500).json(err);
            } else {
                res.status(204).end();
            }
        });
    }
}
