import {FunctionComponent, useState} from 'react';
import {RuleRequest} from '../../../types/rules';
import {Fab} from '../../design/fab';
import {Icon} from '../../design/icon';
import {Modal} from '../../design/modal';
import {doPost} from '../../helpers/fetch';
import {swrKeys} from '../swr-keys';
import {RuleForm} from './rule-form';

type Props = {
    onCreate: () => void
}

export const RuleCreate: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const createRule = async (rule: RuleRequest) => {
        await doPost(swrKeys.rules, rule);

        closeModal();
        props.onCreate();
    };

    return (
        <>
            <Fab onClick={openModal}>
                <Icon type={'add'}/>
            </Fab>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
            >
                <RuleForm
                    onCancel={closeModal}
                    onSubmit={createRule}
                    title={'Create new rule'}
                />
            </Modal>
        </>
    );
};
