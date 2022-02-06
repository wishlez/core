import {NextApiRequest, NextApiResponse} from 'next';
import * as jwt from 'next-auth/jwt';

const secret = process.env.JWT_SECRET;

const user = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await jwt.getToken({req, secret});
    res.send(JSON.stringify(token, undefined, 2));
};

export default user;
