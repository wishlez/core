import {FunctionComponent, useState} from 'react';
import {TagRequest} from '../../../types/categories';
import {Fab} from '../../design/fab';
import {Icon} from '../../design/icon';
import {Modal} from '../../design/modal';
import {doPost} from '../../helpers/fetch';
import {swrKeys} from '../swr-keys';
import {TagForm} from './tag-form';

type Props = {
    onCreate: () => void
}

export const TagCreate: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const createTag = async (tag: TagRequest) => {
        await doPost(swrKeys.categories.tags, tag);

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
                <TagForm
                    onCancel={closeModal}
                    onSubmit={createTag}
                    title={'Create new tag'}
                />
            </Modal>
        </>
    );
};
