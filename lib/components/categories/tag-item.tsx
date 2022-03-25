import {FunctionComponent} from 'react';
import {Tag} from '../../../types/categories';
import {ItemDescription} from '../shared/item-description';
import {TagUpdate} from './tag-update';

type Props = {
    tag: Tag
    onUpdate: () => void
}

export const TagItem: FunctionComponent<Props> = (props) => (
    <>
        <ItemDescription>
            {props.tag.name}
        </ItemDescription>
        <TagUpdate
            onUpdate={props.onUpdate}
            tag={props.tag}
        />
    </>
);
