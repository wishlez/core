import {NextApiHandler} from 'next';
import {createUser} from '../../../lib/services/users';

const handler: NextApiHandler = async (req, res) => {
    try {
        await createUser({
            name: req.body.name,
            login: req.body.login,
            password: req.body.password
        });
        res.redirect('/auth/sign-in');
    } catch (err) {
        console.error(err.message);
        res.redirect('/auth/sign-up?error=CreateAccount');
    }
};

export default handler;
