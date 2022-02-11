import {authenticatedApi, authorizedApi} from '../../../lib/auth/ss-auth';
import {buildApiHandler} from '../../../lib/build-api-handler';
import {badRequest, forbidden, internalServerError} from '../../../lib/handle-error';
import {createGroup, deleteGroup, getGroups, getGroupUserId, updateGroup} from '../../../lib/services/categories/groups';

export default authenticatedApi((user) => buildApiHandler({
    async get(req, res) {
        try {
            const groups = await getGroups(user);

            return res.send({
                groups
            });
        } catch (err) {
            return internalServerError(res, err, 'Failed to retrieve groups');
        }
    },
    async post(req, res) {
        try {
            const group = await createGroup({
                name: req.body.name,
                userId: user.id
            });

            return res.send(group);
        } catch (err) {
            return internalServerError(res, err, 'Failed to create group');
        }
    },
    async put(req, res) {
        if (!await authorizedApi(req, await getGroupUserId(req.body.id))) {
            return forbidden(res);
        }

        try {
            const group = await updateGroup({
                id: req.body.id,
                name: req.body.name
            });

            return res.send(group);
        } catch (err) {
            return internalServerError(res, err, 'Failed to update group');
        }
    },
    async delete(req, res) {
        const id = Number(req.query.id);

        if (isNaN(id)) {
            return badRequest(res);
        }

        if (!await authorizedApi(req, await getGroupUserId(id))) {
            return forbidden(res);
        }

        try {
            await deleteGroup(id);

            return res.send({});
        } catch (err) {
            return internalServerError(res, err, 'Failed to delete group');
        }
    }
}));
