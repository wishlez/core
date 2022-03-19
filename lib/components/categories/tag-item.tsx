import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Tag} from '../../../types/categories';
import {TagDelete} from './tag-delete';
import {TagEdit} from './tag-edit';

type Props = {
    tag: Tag
    onUpdate: () => void
}

const Item = styled('div')`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const TagItem: FunctionComponent<Props> = (props) => (
    <Item>
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
    </Item>
);
