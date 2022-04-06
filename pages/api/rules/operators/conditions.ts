import {NextApiResponse} from 'next';
import {buildApiHandler} from '../../../../lib/helpers/build-api-handler';
import {internalServerError} from '../../../../lib/helpers/handle-error';
import {getConditionOperators} from '../../../../lib/services/rules/operators';
import {WithConditionOperators} from '../../../../types/operators';

export default buildApiHandler({
    async get(req, res: NextApiResponse<WithConditionOperators>) {
        try {
            const conditionOperators = await getConditionOperators();

            return res.send({
                conditionOperators
            });
        } catch (err) {
            return internalServerError(res, err, 'Failed to retrieve condition operators');
        }
    }
});
