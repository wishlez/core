import {NextApiHandler} from 'next';
import {encryptPassword} from '../../../lib/password';
import {getPrismaClient} from '../../../lib/prisma';

const prisma = getPrismaClient();

const handler: NextApiHandler = async (req, res) => {
    try {
        await prisma.user.create({
            data: {
                name: req.body.name,
                login: req.body.login,
                password: encryptPassword(req.body.password)
            }
        });
        res.redirect('/auth/sign-in');
    } catch (err) {
        console.error(err.message);
        res.redirect('/auth/sign-up?error=CreateAccount');
    }
};

export default handler;
