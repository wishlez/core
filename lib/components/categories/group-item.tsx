import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Group} from '../../../types/categories';
import {Badge} from '../../design/badge';
import {Card} from '../../design/card';
import {DetailsColumn} from '../shared/details-column';
import {ItemDescription} from '../shared/item-description';
import {TagsContainer} from '../shared/tags-container';
import {GroupDelete} from './group-delete';
import {GroupEdit} from './group-edit';

type Props = {
    group: Group
    onUpdate: () => void
}

const Item = styled(Card)`
    display: flex;
    justify-content: space-between;
    margin: var(--grid-gap);
`;

export const GroupItem: FunctionComponent<Props> = (props) => (
    <Item>
        <DetailsColumn>
            <ItemDescription>
                {props.group.name}
            </ItemDescription>
            {Boolean(props.group.tags.length) && (
                <TagsContainer>
                    {props.group.tags.map(({tag}) => (
                        <Badge key={tag.id}>
                            {tag.name}
                        </Badge>
                    ))}
                </TagsContainer>
            )}
        </DetailsColumn>
        <section>
            <GroupEdit group={props.group} onSave={props.onUpdate}/>
            <GroupDelete group={props.group} onDelete={props.onUpdate}/>
        </section>
    </Item>
);
