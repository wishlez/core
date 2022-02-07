import {authenticatedApi} from '../../../lib/auth/ss-auth';
import {buildApiHandler} from '../../../lib/build-api-handler';
import {createTag, deleteTag, getTags, updateTag} from '../../../lib/services/categories/tags';

export default authenticatedApi((user) => buildApiHandler({
    async get(req, res) {
        return res.send({
            tags: await getTags(user)
        });
    },
    async post(req, res) {
        try {
            const tag = await createTag({
                name: req.body.name,
                userId: user.id
            });

            return res.send(tag);
        } catch (err) {
            console.error(err.message);

            return res.status(500).send({
                error: 'Failed to create tag'
            });
        }
    },
    async put(req, res) {
        try {
            const tag = await updateTag({
                ...req.body,
                userId: user.id
            });

            return res.send(tag);
        } catch (err) {
            console.error(err.message);

            return res.status(500).send({
                error: 'Failed to update tag'
            });
        }
    },
    async delete(req, res) {
        const id = Number(req.query.id);

        if (isNaN(id)) {
            return res.status(400).send({
                error: 'Bad request'
            });
        }

        await deleteTag(id);

        return res.send({});
    }
}));
