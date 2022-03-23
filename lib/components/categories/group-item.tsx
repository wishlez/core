import {FunctionComponent} from 'react';
import {Group} from '../../../types/categories';
import {ItemDescription} from '../shared/item-description';
import {TagsContainer} from '../shared/tags-container';
import {GroupDelete} from './group-delete';
import {GroupEdit} from './group-edit';

type Props = {
    group: Group
    onUpdate: () => void
}

export const GroupItem: FunctionComponent<Props> = (props) => (
    <>
        <ItemDescription>
            {props.group.name}
        </ItemDescription>
        <TagsContainer
            maxTags={5}
            tags={props.group.tags}
        />
        <section>
            <GroupEdit
                group={props.group}
                onSave={props.onUpdate}
            />
            <GroupDelete
                group={props.group}
                onDelete={props.onUpdate}
            />
        </section>
    </>
);
