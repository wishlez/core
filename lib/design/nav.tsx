import {Fragment, FunctionComponent} from 'react';
import styled from 'styled-components';
import {Banner} from './banner';
import {NavItem} from './nav-item';
import {NavProps} from './nav-props';

const Header = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: var(--grid-gap);
`;

const NavSection = styled.div`
    color: var(--mono-500);
    border-bottom: 1px solid var(--mono-800);
    margin: var(--control-padding-y) 0;
    padding: var(--control-padding-cozy-y) 0;
    font-size: .75em;
`;

export const Nav: FunctionComponent<NavProps> = (props) => (
    <nav>
        <Header>
            <Banner orientation={'vertical'}/>
        </Header>
        {props.items.map((item1, index1) => 'items' in item1 ? (
            <Fragment key={index1}>
                <NavSection>
                    {item1.label}
                </NavSection>
                {item1.items.map((item2, index2) => (
                    <NavItem
                        components={[item2.component, props.navItemComponent]}
                        item={item2}
                        key={index2}
                    />
                ))}
            </Fragment>
        ) : (
            <NavItem
                components={[item1.component, props.navItemComponent]}
                item={item1}
                key={index1}
            />
        ))}
    </nav>
);
