import {FunctionComponent, useState} from 'react';
import {Group, GroupRequest} from '../../../types/categories';
import {Button} from '../../design/button';
import {Icon} from '../../design/icon';
import {Modal} from '../../design/modal';
import {doPut} from '../../fetch';
import {swrKeys} from '../swr-keys';
import {GroupForm} from './group-form';

type Props = {
    group: Group
    onSave: () => void
}

export const GroupEdit: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const saveGroup = async (group: GroupRequest) => {
        await doPut(swrKeys.categories.groups, {
            ...props.group,
            ...group
        });

        closeModal();
        props.onSave();
    };

    return (
        <>
            <Button variant="text" color="secondary" size="compact" onClick={openModal}>
                <Icon type="create"/>
            </Button>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <GroupForm
                    onSubmit={saveGroup}
                    onCancel={closeModal}
                    group={props.group}
                    title={`Edit group #${props.group.id}`}
                />
            </Modal>
        </>
    );
};