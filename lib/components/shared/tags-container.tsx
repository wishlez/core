import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {WithTag} from '../../../types/categories';
import {Badge} from '../../design/badge';

const Container = styled.div`
    align-items: baseline;
    display: grid;
    grid-gap: var(--grid-gap);
    grid-auto-flow: column;
    justify-content: start;
`;

type Props = {
    maxTags?: number
    tags: WithTag[]
}

export const TagsContainer: FunctionComponent<Props> = (props) => (
    <Container>
        {props.tags.slice(0, props.maxTags).map(({tag}) => (
            <Badge
                key={tag.id}
                size={'compact'}
            >
                {tag.name}
            </Badge>
        ))}
        {props.tags.length > props.maxTags && (
            <>
                {'...'}
            </>
        )}
    </Container>
);

TagsContainer.defaultProps = {
    maxTags: 3
};
