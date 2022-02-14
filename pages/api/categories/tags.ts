import {NextApiResponse} from 'next';
import {authenticatedApi, authorizedApi} from '../../../lib/auth/ss-auth';
import {buildApiHandler} from '../../../lib/build-api-handler';
import {badRequest, forbidden, internalServerError} from '../../../lib/handle-error';
import {createTag, deleteTag, getTags, getTagUserId, updateTag} from '../../../lib/services/categories/tags';
import {Tag, WithTags} from '../../../types/categories';

export default authenticatedApi((user) => buildApiHandler({
    async get(req, res: NextApiResponse<WithTags>) {
        try {
            const tags = await getTags(user);

            return res.send({
                tags
            });
        } catch (err) {
            return internalServerError(res, err, 'Failed to retrieve tags');
        }
    },
    async post(req, res: NextApiResponse<Tag>) {
        try {
            const tag = await createTag({
                name: req.body.name,
                userId: user.id
            });

            return res.send(tag);
        } catch (err) {
            return internalServerError(res, err, 'Failed to create tag');
        }
    },
    async put(req, res: NextApiResponse<Tag>) {
        if (!await authorizedApi(req, await getTagUserId(req.body.id))) {
            return forbidden(res);
        }

        try {
            const tag = await updateTag({
                id: req.body.id,
                name: req.body.name
            });

            return res.send(tag);
        } catch (err) {
            return internalServerError(res, err, 'Failed to update tag');
        }
    },
    async delete(req, res: NextApiResponse<{}>) {
        const id = Number(req.query.id);

        if (isNaN(id)) {
            return badRequest(res);
        }

        if (!await authorizedApi(req, await getTagUserId(id))) {
            return forbidden(res);
        }

        try {
            await deleteTag(id);

            return res.send({});
        } catch (err) {
            return internalServerError(res, err, 'Failed to delete tag');
        }
    }
}));
