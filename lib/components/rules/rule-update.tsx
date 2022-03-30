import {FunctionComponent, useState} from 'react';
import {Rule, RuleRequest} from '../../../types/rules';
import {Button} from '../../design/button';
import {Icon} from '../../design/icon';
import {Modal} from '../../design/modal';
import {doDelete, doPut} from '../../helpers/fetch';
import {swrKeys} from '../swr-keys';
import {RuleForm} from './rule-form';

type Props = {
    rule: Rule
    onUpdate: () => void
}

export const RuleUpdate: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const saveRule = async (rule: RuleRequest) => {
        await doPut(swrKeys.rules, {
            ...props.rule,
            ...rule
        });

        closeModal();
        props.onUpdate();
    };

    const deleteRule = async () => {
        await doDelete(swrKeys.rules, {id: props.rule.id});

        closeModal();
        props.onUpdate();
    };

    return (
        <>
            <Button
                color={'tertiary'}
                onClick={openModal}
                size={'compact'}
                variant={'text'}
            >
                <Icon type={'open'}/>
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
            >
                <RuleForm
                    onCancel={closeModal}
                    onDelete={deleteRule}
                    onSubmit={saveRule}
                    rule={props.rule}
                    title={`Edit rule #${props.rule.id}`}
                />
            </Modal>
        </>
    );
};
