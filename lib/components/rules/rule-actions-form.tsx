import {forwardRef, useEffect, useRef, useState} from 'react';
import {Option} from '../../../types/input';
import {AnyObject} from '../../../types/object';
import {Action, RuleActionRef} from '../../../types/rule-actions';
import {Button} from '../../design/button';
import {FormSubtitle} from '../../design/form-subtitle';
import {getRandomId} from '../../design/helpers/randomizer';
import {Icon} from '../../design/icon';
import {RuleActionForm} from './rule-action-form';

type Props = {
    defaultActions?: Action[]
    fields: Option[]
    title: string
}

export const RuleActionsForm = forwardRef<RuleActionRef[], Props>((props, ref) => {
    const [actions, setActions] = useState<string[]>(props.defaultActions.map(() => getRandomId('action')));
    const actionRefs = useRef<AnyObject<string, RuleActionRef>>({});

    const addAction = () => {
        setActions((items) => items.concat(getRandomId('action')));
    };

    const removeAction = (id: string) => {
        setActions((items) => {
            delete actionRefs.current[id];
            return items.filter((item) => item !== id);
        });
    };

    useEffect(() => {
        const refs = Object.values(actionRefs.current);

        if (typeof ref === 'function') {
            ref(refs);
        } else if (ref) {
            ref.current = refs;
        }

        if (actions.length === 0) {
            addAction();
        }
    }, [ref, actions.length]);

    return (
        <>
            <FormSubtitle>
                {props.title}
                <Button
                    color={'tertiary'}
                    onClick={addAction}
                    size={'compact'}
                    variant={'text'}
                >
                    <Icon
                        size={'in-text'}
                        type={'add'}
                    />
                    {'Add new'}
                </Button>
            </FormSubtitle>
            {actions.map((action, index) => (
                <RuleActionForm
                    action={props.defaultActions[index]}
                    canDelete={actions.length !== 1}
                    fields={props.fields}
                    key={action}
                    onDelete={() => removeAction(action)}
                    ref={(actionRef) => actionRefs.current[action] = actionRef}
                >
                    {action}
                </RuleActionForm>
            ))}
        </>
    );
});

RuleActionsForm.displayName = 'RuleActionsForm';

RuleActionsForm.defaultProps = {
    defaultActions: []
};
