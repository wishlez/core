import {FunctionComponent} from 'react';
import {Group} from '../../../types/categories';
import {GroupDelete} from './group-delete';
import {GroupEdit} from './group-edit';

type Props = {
    group: Group
    onUpdate: () => void
}

export const GroupItem: FunctionComponent<Props> = (props) => (
    <div>
        {props.group.name}
        <GroupEdit group={props.group} onSave={props.onUpdate}/>
        <GroupDelete group={props.group} onDelete={props.onUpdate}/>
        <div>
            {props.group.tags.map(({tag}) => `#${tag.name}`).join(' ')}
        </div>
    </div>
);
