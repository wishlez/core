import {Prisma} from '@prisma/client';
import {getPrismaClient} from '../../prisma';

const prisma = getPrismaClient();

export const getGroups = async (user: Prisma.UserWhereInput) => await prisma.categoryGroup.findMany({
    where: {
        user
    },
    include: {
        tags: {
            include: {
                tag: true
            }
        }
    }
});

export const createGroup = async (data: Prisma.CategoryGroupUncheckedCreateInput) => await prisma.categoryGroup.create({
    data
});

export const deleteGroup = async (id: number) => await prisma.categoryGroup.delete({
    where: {
        id
    }
});

export const updateGroup = async (data: Prisma.CategoryGroupUncheckedUpdateInput) => await prisma.categoryGroup.update({
    data,
    where: {
        id: data.id as number
    }
});

export const getGroupUserId = async (id: number): Promise<number> => (await prisma.categoryGroup.findUnique({
    where: {
        id
    }
})).userId;
