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
    } catch (error) {
        console.error(error.message);
        res.redirect('/auth/register?error=CreateAccount');
    }
};

export default handler;
