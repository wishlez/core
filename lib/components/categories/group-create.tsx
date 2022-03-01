import {FunctionComponent, useState} from 'react';
import {GroupRequest} from '../../../types/categories';
import {Fab} from '../../design/fab';
import {Icon} from '../../design/icon';
import {Modal} from '../../design/modal';
import {doPost} from '../../helpers/fetch';
import {GroupForm} from './group-form';

type Props = {
    onCreate: () => void
}

export const GroupCreate: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const createGroup = async (group: GroupRequest) => {
        await doPost('/api/categories/groups', group);

        closeModal();
        props.onCreate();
    };

    return (
        <>
            <Fab onClick={openModal}>
                <Icon type={'add'}/>
            </Fab>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <GroupForm
                    onSubmit={createGroup}
                    onCancel={closeModal}
                    title="Create new group"
                />
            </Modal>
        </>
    );
};
