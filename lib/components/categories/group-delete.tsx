import {FunctionComponent, useState} from 'react';
import {Group} from '../../../types/categories';
import {Button} from '../../design/button';
import {Icon} from '../../design/icon';
import {doDelete} from '../../fetch';
import {ConfirmationModal} from '../confirmation-modal';
import {swrKeys} from '../swr-keys';

type Props = {
    group: Group
    onDelete: () => void
}

export const GroupDelete: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const deleteGroup = async () => {
        await doDelete(swrKeys.categories.groups, {id: props.group.id});

        closeModal();
        props.onDelete();
    };

    return (
        <>
            <Button variant="text" color="danger" size="compact" onClick={openModal}>
                <Icon type="delete"/>
            </Button>
            <ConfirmationModal
                title={`Delete group #${props.group.id}`}
                isOpen={isOpen}
                onCancel={closeModal}
                onConfirm={deleteGroup}
            />
        </>
    );
};
