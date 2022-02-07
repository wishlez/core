import {NextApiHandler} from 'next';
import * as jwt from 'next-auth/jwt';

const secret = process.env.JWT_SECRET;

const user: NextApiHandler = async (req, res) => {
    const token = await jwt.getToken({req, secret});
    res.send(JSON.stringify(token, undefined, 2));
};

export default user;
