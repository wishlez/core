import {NextApiResponse} from 'next';
import {buildApiHandler} from '../../../../lib/helpers/build-api-handler';
import {internalServerError} from '../../../../lib/helpers/handle-error';
import {getActionOperators} from '../../../../lib/services/rules/operators';
import {WithActionOperators} from '../../../../types/operators';

export default buildApiHandler({
    async get(req, res: NextApiResponse<WithActionOperators>) {
        try {
            const actionOperators = await getActionOperators();

            return res.send({
                actionOperators
            });
        } catch (err) {
            return internalServerError(res, err, 'Failed to retrieve action operators');
        }
    }
});
