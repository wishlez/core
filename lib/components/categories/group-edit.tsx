import {FunctionComponent, useState} from 'react';
import {Group, GroupRequest} from '../../../types/categories';
import {Button} from '../../design/button';
import {Icon} from '../../design/icon';
import {Modal} from '../../design/modal';
import {doPut} from '../../helpers/fetch';
import {getAdjustedTags, toTagIds} from '../../helpers/tags';
import {swrKeys} from '../swr-keys';
import {GroupForm} from './group-form';

type Props = {
    group: Group
    onSave: () => void
}

export const GroupEdit: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const existingTags = toTagIds(props.group.tags);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const saveGroup = async (group: GroupRequest) => {
        await doPut(swrKeys.categories.groups, {
            ...props.group,
            ...group,
            tags: getAdjustedTags(existingTags, group.tags)
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
                <Icon type={'edit'}/>
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
            >
                <GroupForm
                    group={props.group}
                    onCancel={closeModal}
                    onSubmit={saveGroup}
                    title={`Edit group #${props.group.id}`}
                />
            </Modal>
        </>
    );
};
