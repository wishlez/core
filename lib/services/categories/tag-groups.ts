import {getPrismaClient} from '../../prisma';

const prisma = getPrismaClient();

export const updateTagGroup = async (groupId: number, added: number[], deleted: number[]) => prisma.$transaction([
    prisma.categoryTagGroup.deleteMany({
        where: {
            groupId,
            tagId: {
                in: deleted
            }
        }
    }),
    prisma.categoryTagGroup.createMany({
        data: added.map((tagId) => ({
            tagId,
            groupId
        }))
    })
]);
