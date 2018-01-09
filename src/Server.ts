import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as path from 'path';
// import configs
import config from '../config/config';
// import routers
import UserRouter from './services/users/UserRouter';
import PostRouter from './services/posts/PostRouter';

export default class Server {

  // set app to be of type express.Application
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  // application config
  public config(): void {

    // set up mongoose
    mongoose.connect(config.mongo.url || process.env.MONGODB_URI);

    // express middleware
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());

    // // cors
    // this.app.use((req, res, next) => {
    //   res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    //   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    //   res.header('Access-Control-Allow-Credentials', 'true');
    //   next();
    // });    
  }

  // application routes
  public routes(): void {
    const router: express.Router = express.Router();

    this.app.use('/', router);
    this.app.use('/api/users', new UserRouter().router);
    this.app.use('/api/posts', new PostRouter().router);
  }

  public start() {
    (mongoose as any).Promise = global.Promise;
    var promise = mongoose.connect(config.mongo.url);

    //on connection success
    mongoose.connection.on('connected', () => {
      console.log('Connected to database ' + config.mongo.url + '...');
    });
    //On database connection error
    mongoose.connection.on('error', (err) => {
      console.log('Database connection error: ' + err);
    });

    this.app.listen(config.http.port, () => console.log(`Server started on port ${config.http.port}!`));
  }
}
