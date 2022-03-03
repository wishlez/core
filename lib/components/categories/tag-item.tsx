import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Tag} from '../../../types/categories';
import {Card} from '../../design/card';
import {TagDelete} from './tag-delete';
import {TagEdit} from './tag-edit';

type Props = {
    tag: Tag
    onUpdate: () => void
}

const Item = styled(Card)`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin: var(--grid-gap-small);

    @media (min-width: 480px) {
        max-width: calc(50% - var(--grid-gap));
    }

    @media (min-width: 800px) {
        max-width: 300px;
    }
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
