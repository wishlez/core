import {FunctionComponent, useState} from 'react';
import {Tag, TagRequest} from '../../../types/categories';
import {Button} from '../../design/button';
import {Icon} from '../../design/icon';
import {Modal} from '../../design/modal';
import {doDelete, doPut} from '../../helpers/fetch';
import {swrKeys} from '../swr-keys';
import {TagForm} from './tag-form';

type Props = {
    tag: Tag
    onUpdate: () => void
}

export const TagUpdate: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const saveTag = async (tag: TagRequest) => {
        await doPut(swrKeys.categories.tags, {
            ...props.tag,
            ...tag
        });

        closeModal();
        props.onUpdate();
    };

    const deleteTag = async () => {
        await doDelete(swrKeys.categories.tags, {id: props.tag.id});

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
                <TagForm
                    onCancel={closeModal}
                    onDelete={deleteTag}
                    onSubmit={saveTag}
                    tag={props.tag}
                    title={`Edit tag #${props.tag.id}`}
                />
            </Modal>
        </>
    );
};
