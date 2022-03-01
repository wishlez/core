import {NextApiResponse} from 'next';
import {authenticatedApi, authorizedApi} from '../../../lib/auth/ss-auth';
import {buildApiHandler} from '../../../lib/build-api-handler';
import {badRequest, forbidden, internalServerError} from '../../../lib/handle-error';
import {createTransaction, deleteTransaction, getTransactions, getTransactionUserId, updateTransaction} from '../../../lib/services/transactions';
import {Transaction, WithTransactions} from '../../../types/transactions';

export default authenticatedApi((user) => buildApiHandler({
    async get(req, res: NextApiResponse<WithTransactions>) {
        try {
            const transactions = await getTransactions(user);

            return res.send({
                transactions
            });
        } catch (err) {
            return internalServerError(res, err, 'Failed to retrieve transactions');
        }
    },
    async post(req, res: NextApiResponse<Transaction>) {
        try {
            const transaction = await createTransaction(
                {
                    description: req.body.description,
                    amount: req.body.amount,
                    toAccountId: req.body.toAccountId,
                    fromAccountId: req.body.fromAccountId,
                    date: req.body.date,
                    userId: user.id
                },
                req.body.tags
            );

            return res.send(transaction);
        } catch (err) {
            return internalServerError(res, err, 'Failed to create transaction');
        }
    },
    async put(req, res: NextApiResponse<Transaction>) {
        if (!await authorizedApi(req, await getTransactionUserId(req.body.id))) {
            return forbidden(res);
        }

        try {
            const transaction = await updateTransaction(
                {
                    id: req.body.id,
                    description: req.body.description,
                    amount: req.body.amount,
                    toAccountId: req.body.toAccountId,
                    fromAccountId: req.body.fromAccountId,
                    date: req.body.date
                },
                req.body.tags.added,
                req.body.tags.deleted
            );

            return res.send(transaction);
        } catch (err) {
            return internalServerError(res, err, 'Failed to update transaction');
        }
    },
    async delete(req, res: NextApiResponse<{}>) {
        const id = Number(req.query.id);

        if (isNaN(id)) {
            return badRequest(res);
        }

        if (!await authorizedApi(req, await getTransactionUserId(id))) {
            return forbidden(res);
        }

        try {
            await deleteTransaction(id);

            return res.send({});
        } catch (err) {
            return internalServerError(res, err, 'Failed to delete transaction');
        }
    }
}));
