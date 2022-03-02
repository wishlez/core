import {FunctionComponent, useState} from 'react';
import {Tag, TagRequest} from '../../../types/categories';
import {Button} from '../../design/button';
import {Icon} from '../../design/icon';
import {Modal} from '../../design/modal';
import {doPut} from '../../helpers/fetch';
import {swrKeys} from '../swr-keys';
import {TagForm} from './tag-form';

type Props = {
    tag: Tag
    onSave: () => void
}

export const TagEdit: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const saveTag = async (tag: TagRequest) => {
        await doPut(swrKeys.categories.tags, {
            ...props.tag,
            ...tag
        });

        closeModal();
        props.onSave();
    };

    return (
        <>
            <Button
                color={'secondary'}
                onClick={openModal}
                size={'compact'}
                variant={'text'}
            >
                <Icon type={'create'}/>
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
            >
                <TagForm
                    onCancel={closeModal}
                    onSubmit={saveTag}
                    tag={props.tag}
                    title={`Edit tag #${props.tag.id}`}
                />
            </Modal>
        </>
    );
};
