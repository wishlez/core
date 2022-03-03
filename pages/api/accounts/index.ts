import {NextApiResponse} from 'next';
import {authenticatedApi, authorizedApi} from '../../../lib/auth/ss-auth';
import {buildApiHandler} from '../../../lib/helpers/build-api-handler';
import {badRequest, forbidden, internalServerError} from '../../../lib/helpers/handle-error';
import {createAccount, deleteAccount, getAccounts, getAccountUserId, updateAccount} from '../../../lib/services/accounts';
import {Account, WithAccounts} from '../../../types/accounts';

export default authenticatedApi((user) => buildApiHandler({
    async delete(req, res: NextApiResponse<{}>) {
        const id = Number(req.query.id);

        if (isNaN(id)) {
            return badRequest(res);
        }

        if (!await authorizedApi(req, await getAccountUserId(id))) {
            return forbidden(res);
        }

        try {
            await deleteAccount(id);

            return res.send({});
        } catch (err) {
            return internalServerError(res, err, 'Failed to delete account');
        }
    },
    async get(req, res: NextApiResponse<WithAccounts>) {
        try {
            const accounts = await getAccounts(user);

            return res.send({
                accounts
            });
        } catch (err) {
            return internalServerError(res, err, 'Failed to retrieve accounts');
        }
    },
    async post(req, res: NextApiResponse<Account>) {
        try {
            const account = await createAccount({
                accountTypeId: req.body.accountTypeId,
                builtIn: false,
                maximumAmountOwed: req.body.maximumAmountOwed,
                name: req.body.name,
                openingBalance: req.body.openingBalance,
                userId: user.id
            });

            return res.send(account);
        } catch (err) {
            return internalServerError(res, err, 'Failed to create account');
        }
    },
    async put(req, res: NextApiResponse<Account>) {
        if (!await authorizedApi(req, await getAccountUserId(req.body.id))) {
            return forbidden(res);
        }

        try {
            const account = await updateAccount({
                accountTypeId: req.body.accountTypeId,
                id: req.body.id,
                maximumAmountOwed: req.body.maximumAmountOwed,
                name: req.body.name,
                openingBalance: req.body.openingBalance
            });

            return res.send(account);
        } catch (err) {
            return internalServerError(res, err, 'Failed to update account');
        }
    }
}));
