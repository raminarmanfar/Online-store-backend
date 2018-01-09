import UserModel from "./UserModel";

export default class UserController {       
    // public promiseTest() {
    //     const promise = new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             console.log("async task calling callback");
    //             if(false) {
    //                 reject();
    //             } else {
    //                 resolve(123);
    //             }
    //         }, 1000);
    //     });
    // }

    public getAll(cb: any) {
        UserModel.find().then((data) => {
            cb(200, data);
        }).catch((error) => {
            cb(500, error);
        });
    }

    public getByUsername(username: string, cb: any) {
        UserModel.findOne({ username }).then((data) => {
            cb(200, data);
        }).catch((error) => {
            cb(500, error);
        });
    }

    public create(data: any, cb: any) {
        const firstName: string = data.firstName;
        const lastName: string = data.lastName;
        const username: string = data.username;
        const email: string = data.email;
        const password: string = data.password;

        const userModel = new UserModel({
            firstName,
            lastName,
            username,
            email,
            password
        });

        userModel.save().then((data) => {
            cb(201, data);
        }).catch((error) => {
            cb(500, error);
        });
    }

    public update(username: string, newData: any,  cb: any) {
        UserModel.findOneAndUpdate({ username }, newData).then((data) => {
            cb(200, data);
        }).catch((error) => {
            cb(500, error);
        });
    }

    public delete(username: string, cb) {
        UserModel.findOneAndRemove({ username }).then(() => {
            cb(null);
        }).catch((error) => {
            cb(error);
        });
    }
}