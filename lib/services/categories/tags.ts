import {Prisma} from '@prisma/client';
import {getPrismaClient} from '../../prisma';

const prisma = getPrismaClient();

export const getTags = async (user: Prisma.UserWhereInput) => await prisma.categoryTag.findMany({
    where: {
        user
    }
});

export const createTag = async (data: Prisma.CategoryTagUncheckedCreateInput) => await prisma.categoryTag.create({
    data
});

export const deleteTag = async (id: number) => await prisma.categoryTag.delete({
    where: {
        id
    }
});

export const updateTag = async (data: Prisma.CategoryTagUncheckedUpdateInput) => await prisma.categoryTag.update({
    data,
    where: {
        id: data.id as number
    }
});
