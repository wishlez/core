import {FunctionComponent, useState} from 'react';
import {TagGroup} from '../../../types/categories';
import {GroupDelete} from './group-delete';
import {GroupEdit} from './group-edit';
import {TagGroups} from './tag-groups';

type Props = {
    group: TagGroup
    onUpdate: () => void
}

export const GroupItem: FunctionComponent<Props> = (props) => {
    const [tagging, setTagging] = useState<boolean>(false);

    const refreshTags = () => {
        setTagging(false);
        props.onUpdate();
    };

    return (
        <div>
            {props.group.name}
            {tagging ? (
                <TagGroups
                    groupId={props.group.id}
                    onSave={refreshTags}
                    onCancel={() => setTagging(false)}
                    tags={props.group.tags.map(({tag}) => tag.id)}
                />
            ) : (
                <>
                    <GroupEdit group={props.group} onSave={props.onUpdate}/>
                    <GroupDelete group={props.group} onDelete={props.onUpdate}/>
                    <button onClick={() => setTagging(true)}>Edit tags</button>
                    <div>
                        {props.group.tags.map(({tag}) => `#${tag.name}`).join(' ')}
                    </div>
                </>
            )}
        </div>
    );
};
