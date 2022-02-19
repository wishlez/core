import {FunctionComponent, useState} from 'react';
import useSWR from 'swr';
import {WithTags} from '../../../types/categories';
import {doGet, doPatch, toParams} from '../../fetch';
import {swrKeys} from '../swr-keys';

type Props = {
    groupId: number
    tags: number[]
    onCancel: () => void
    onSave: () => void
}

const swrKey = '/api/categories/tag-groups';

export const TagGroups: FunctionComponent<Props> = (props) => {
    const {data: {tags} = {tags: []}} = useSWR<WithTags>(swrKeys.categories.tags, doGet);
    const [groupedTags, setGroupedTags] = useState<Set<number>>(() => new Set(props.tags));

    const updateGroup = (id: number, checked: boolean) => {
        console.log(id, checked);
        setGroupedTags((oldTags) => {
            if (checked) {
                oldTags.add(id);
            } else {
                oldTags.delete(id);
            }

            return new Set([...oldTags]);
        });
    };

    const saveGroup = async () => {
        await doPatch(`${swrKey}${toParams({groupId: props.groupId})}`, {
            deleted: [...props.tags].filter((tag) => !groupedTags.has(tag)),
            added: [...groupedTags].filter((tag) => !props.tags.includes(tag))
        });

        props.onSave();
    };

    const toggleAll = () => {
        const allTags = tags.map((tag) => tag.id);
        setGroupedTags(new Set(groupedTags.size === 0 ? allTags : []));
    };

    return (
        <div>
            {tags.map((tag) => (
                <label key={tag.id}>
                    <input
                        type="checkbox" checked={groupedTags.has(tag.id)}
                        onChange={(event) => updateGroup(tag.id, event.target.checked)}
                    />
                    #{tag.name}
                </label>
            ))}
            <button onClick={() => saveGroup()}>Save</button>
            <button onClick={() => props.onCancel()}>Cancel</button>
            <button onClick={() => toggleAll()}>Toggle All</button>
        </div>
    );
};
