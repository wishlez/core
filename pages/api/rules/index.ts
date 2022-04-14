import {NextApiResponse} from 'next';
import {authenticatedApi, authorizedApi} from '../../../lib/auth/ss-auth';
import {buildApiHandler} from '../../../lib/helpers/build-api-handler';
import {badRequest, forbidden, internalServerError} from '../../../lib/helpers/handle-error';
import {createRule, deleteRule, getRules, getRuleUserId, updateRule} from '../../../lib/services/rules';
import {RuleResponse, WithRules} from '../../../types/rules';

export default authenticatedApi((user) => buildApiHandler({
    async delete(req, res: NextApiResponse<{}>) {
        const id = Number(req.query.id);

        if (isNaN(id)) {
            return badRequest(res);
        }

        if (!await authorizedApi(req, await getRuleUserId(id))) {
            return forbidden(res);
        }

        try {
            await deleteRule(id);

            return res.send({});
        } catch (err) {
            return internalServerError(res, err, 'Failed to delete rule');
        }
    },
    async get(req, res: NextApiResponse<WithRules>) {
        try {
            const rules = await getRules(user);

            return res.send({
                rules
            });
        } catch (err) {
            return internalServerError(res, err, 'Failed to retrieve rules');
        }
    },
    async post(req, res: NextApiResponse<RuleResponse>) {
        try {
            const rule = await createRule(
                {
                    name: req.body.name,
                    runOnCreate: req.body.runOnCreate,
                    runOnUpdate: req.body.runOnUpdate,
                    userId: user.id
                },
                [].concat(req.body.actions.added).map((action) => ({
                    field: action.field,
                    operatorId: action.operatorId,
                    value: action.value
                })),
                [].concat(req.body.conditions.added).map((condition) => ({
                    field: condition.field,
                    operatorId: condition.operatorId,
                    value: condition.value
                }))
            );

            return res.send(rule);
        } catch (err) {
            return internalServerError(res, err, 'Failed to create rule');
        }
    },
    async put(req, res: NextApiResponse<RuleResponse>) {
        if (!await authorizedApi(req, await getRuleUserId(req.body.id))) {
            return forbidden(res);
        }

        try {
            const rule = await updateRule(
                {
                    id: req.body.id,
                    name: req.body.name,
                    runOnCreate: req.body.runOnCreate,
                    runOnUpdate: req.body.runOnUpdate
                },
                req.body.actions,
                req.body.conditions
            );

            return res.send(rule);
        } catch (err) {
            return internalServerError(res, err, 'Failed to update rule');
        }
    }
}));
