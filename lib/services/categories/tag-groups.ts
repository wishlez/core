import {Prisma} from '@prisma/client';
import {getPrismaClient} from '../../prisma';

const prisma = getPrismaClient();

export const getTagGroups = async (groupId: number) => await prisma.categoryTagGroup.findMany({
    where: {
        groupId
    }
});

export const createTagGroup = async (data: Prisma.CategoryTagGroupUncheckedCreateInput) => await prisma.categoryTagGroup.create({
    data
});

export const deleteTagGroup = async (id: number) => await prisma.categoryTagGroup.delete({
    where: {
        id
    }
});

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
