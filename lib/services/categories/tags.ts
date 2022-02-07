import {Prisma} from '@prisma/client';
import {getPrismaClient} from '../../prisma';

const prisma = getPrismaClient();

export const getTags = async (user: Prisma.UserWhereInput) => await prisma.category.findMany({
    where: {
        user
    }
});

export const createTag = async (data: Prisma.CategoryUncheckedCreateInput) => await prisma.category.create({
    data
});

export const deleteTag = async (id: number) => await prisma.category.delete({
    where: {
        id
    }
})
