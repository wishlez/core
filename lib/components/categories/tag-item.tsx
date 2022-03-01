import {FunctionComponent} from 'react';
import {Tag} from '../../../types/categories';
import {TagDelete} from './tag-delete';
import {TagEdit} from './tag-edit';

type Props = {
    tag: Tag
    onUpdate: () => void
}

export const TagItem: FunctionComponent<Props> = (props) => (
    <div>
        #{props.tag.name}
        <TagEdit tag={props.tag} onSave={props.onUpdate}/>
        <TagDelete tag={props.tag} onDelete={props.onUpdate}/>
    </div>
);
