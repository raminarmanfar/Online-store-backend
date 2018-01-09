import PostModel from "./PostModel";


export default class PostController {
    getAllPosts(cb: any) {
        PostModel.find().then((data) => {
            cb(200, data);
        }).catch((error) => {
            cb(500, error);
        });
    }

    getPostBySlug(slug: string, cb: any) {
        PostModel.findOne({ slug }).then((data) => {
            cb(200, data);
        }).catch((error) => {
            cb(500, error);
        });
    }

    create(postData: any, cb: any) {
        const title: string = postData.title;
        const slug: string = postData.slug;
        const content: string = postData.content;
        const featuredImage: string = postData.featuredImage;
        const category: string = postData.category;
        const published: boolean = postData.published;

        if (!title || !slug || !content) {
            cb(422, { message: 'All Fields Required.' });
        }

        const post = new PostModel({
            title,
            slug,
            content,
            featuredImage,
            category,
            published
        });

        post.save().then((data) => {
            cb(201, data);
        }).catch((error) => {
            cb(500, error);
        });
    }

    update(slug: string, newPostData: any, cb: any) {
        PostModel.findOneAndUpdate({ slug }, newPostData).then((data) => {
            cb(200, data);
        }).catch((error) => {
            cb(500, error);
        });
    }

    delete(slug: string, cb: any) {
        PostModel.findOneAndRemove({ slug }).then(() => {
            cb(null);
        }).catch((error) => {
            cb(error);
        });
    }
}