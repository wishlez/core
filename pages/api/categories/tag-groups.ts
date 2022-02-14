import {NextApiResponse} from 'next';
import {authenticatedApi, authorizedApi} from '../../../lib/auth/ss-auth';
import {buildApiHandler} from '../../../lib/build-api-handler';
import {badRequest, forbidden, internalServerError} from '../../../lib/handle-error';
import {getGroupUserId} from '../../../lib/services/categories/groups';
import {updateTagGroup} from '../../../lib/services/categories/tag-groups';

export default authenticatedApi(() => buildApiHandler({
    async patch(req, res: NextApiResponse<{}>) {
        const groupId = Number(req.query.groupId);

        if (isNaN(groupId)) {
            return badRequest(res);
        }

        if (!await authorizedApi(req, await getGroupUserId(groupId))) {
            return forbidden(res);
        }

        try {
            const {added, deleted} = req.body;

            await updateTagGroup(groupId, added, deleted);

            return res.send({});
        } catch (err) {
            return internalServerError(res, err, 'Failed to update group');
        }
    }
}));
