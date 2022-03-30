import {FunctionComponent} from 'react';
import {Rule} from '../../../types/rules';
import {ItemDescription} from '../shared/item-description';
import {RuleUpdate} from './rule-update';

type Props = {
    rule: Rule
    onUpdate: () => void
}

export const RuleItem: FunctionComponent<Props> = (props) => (
    <div>
        <ItemDescription>
            {props.rule.name}
        </ItemDescription>
        <RuleUpdate
            onUpdate={props.onUpdate}
            rule={props.rule}
        />
    </div>
);
