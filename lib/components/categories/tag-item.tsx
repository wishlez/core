import {FunctionComponent} from 'react';
import {Tag} from '../../../types/categories';
import {TagDelete} from './tag-delete';
import {TagEdit} from './tag-edit';

type Props = {
    tag: Tag
    onUpdate: () => void
}

export const TagItem: FunctionComponent<Props> = (props) => (
    <>
        <div>
            {props.tag.name}
        </div>
        <div>
            <TagEdit
                onSave={props.onUpdate}
                tag={props.tag}
            />
            <TagDelete
                onDelete={props.onUpdate}
                tag={props.tag}
            />
        </div>
    </>
);
