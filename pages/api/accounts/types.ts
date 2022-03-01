import {NextApiResponse} from 'next';
import {buildApiHandler} from '../../../lib/helpers/build-api-handler';
import {internalServerError} from '../../../lib/helpers/handle-error';
import {getAccountTypes} from '../../../lib/services/accounts/types';
import {WithAccountTypes} from '../../../types/account-types';

export default buildApiHandler({
    async get(req, res: NextApiResponse<WithAccountTypes>) {
        try {
            const accountTypes = await getAccountTypes();

            return res.send({
                accountTypes
            });
        } catch (err) {
            return internalServerError(res, err, 'Failed to retrieve accounts');
        }
    }
});
