type TagIds = number[]
type Tags = {
    tagId: number
}[]

export const getAdjustedTags = (existingTags: TagIds, updatedTags: TagIds) => ({
    deleted: existingTags.filter((tag) => !updatedTags.includes(tag)),
    added: updatedTags.filter((tag) => !existingTags.includes(tag))
});

export const toTags = (tagIds: TagIds): Tags => tagIds.map((tagId) => ({
    tagId
}));

export const toTagIds = (tags: Tags): TagIds => tags.map(({tagId}) => tagId);
