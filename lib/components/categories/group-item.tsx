import {FunctionComponent} from 'react';
import {Group} from '../../../types/categories';
import {FormattedAmount} from '../../design/formatted-amount';
import {BigAmount} from '../shared/big-amount';
import {ItemDescription} from '../shared/item-description';
import {TagsContainer} from '../shared/tags-container';
import {GroupUpdate} from './group-update';

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
        <BigAmount>
            <FormattedAmount number={props.group.budget}/>
        </BigAmount>
        <GroupUpdate
            group={props.group}
            onUpdate={props.onUpdate}
        />
    </>
);
