import {FunctionComponent, useState} from 'react';
import {Tag} from '../../../types/categories';
import {Button} from '../../design/button';
import {Icon} from '../../design/icon';
import {doDelete} from '../../helpers/fetch';
import {ConfirmationModal} from '../confirmation-modal';
import {swrKeys} from '../swr-keys';

type Props = {
    tag: Tag
    onDelete: () => void
}

export const TagDelete: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const deleteTag = async () => {
        await doDelete(swrKeys.categories.tags, {id: props.tag.id});

        closeModal();
        props.onDelete();
    };

    return (
        <>
            <Button variant="text" color="danger" size="compact" onClick={openModal}>
                <Icon type="delete"/>
            </Button>
            <ConfirmationModal
                title={`Delete tag #${props.tag.id}`}
                isOpen={isOpen}
                onCancel={closeModal}
                onConfirm={deleteTag}
            />
        </>
    );
};
