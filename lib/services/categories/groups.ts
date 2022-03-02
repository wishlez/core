import {CategoryGroup, Prisma} from '@prisma/client';
import {Group} from '../../../types/categories';
import {getPrismaClient} from '../../helpers/prisma';
import {toTags} from '../../helpers/tags';

const prisma = getPrismaClient();

const serialize = (group: CategoryGroup): Group => ({
    ...group,
    budget: group.budget.toNumber()
});

export const getGroups = async (user: Prisma.UserWhereInput) => {
    const groups = await prisma.categoryGroup.findMany({
        include: {
            tags: {
                include: {
                    tag: true
                }
            }
        },
        where: {
            user
        }
    });

    return groups.map(serialize);
};

export const createGroup = async (data: Prisma.CategoryGroupUncheckedCreateInput, tags: number[]) => serialize(await prisma.categoryGroup.create({
    data: {
        ...data,
        tags: {
            createMany: {
                data: toTags(tags)
            }
        }
    }
}));

export const deleteGroup = async (id: number) => await prisma.categoryGroup.delete({
    where: {
        id
    }
});

export const updateGroup = async (data: Prisma.CategoryGroupUncheckedUpdateInput, addedTags: number[], deletedTags: number[]) => serialize(await prisma.categoryGroup.update({
    data: {
        ...data,
        tags: {
            createMany: {
                data: toTags(addedTags)
            },
            deleteMany: {
                tagId: {
                    in: deletedTags
                }
            }
        }
    },
    where: {
        id: data.id as number
    }
}));

export const getGroupUserId = async (id: number): Promise<number> => (await prisma.categoryGroup.findUnique({
    where: {
        id
    }
})).userId;
