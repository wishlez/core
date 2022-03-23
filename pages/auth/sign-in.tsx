import {getCsrfToken} from 'next-auth/react';
import Link from 'next/link';
import {FunctionComponent} from 'react';
import {unauthenticated} from '../../lib/auth/ss-auth';
import {AuthFormContainer} from '../../lib/components/shared/auth-form-container';
import {PageTitle} from '../../lib/components/shared/page-title';
import {Button} from '../../lib/design/button';
import {Form} from '../../lib/design/form';
import {FormActions} from '../../lib/design/form-actions';
import {FormFields} from '../../lib/design/form-fields';
import {FormTitle} from '../../lib/design/form-title';
import {Icon} from '../../lib/design/icon';
import {Input} from '../../lib/design/input';

type Props = {
    csrfToken: string
}

const SignIn: FunctionComponent<Props> = ({csrfToken}) => (
    <>
        <PageTitle title={'Sign In'}/>
        <AuthFormContainer>
            <Form
                action={'/api/auth/callback/credentials'}
                method={'post'}
            >
                <FormTitle>
                    {'Sign In'}
                    <Link href={'/'}>
                        <Button
                            as={'a'}
                            size={'compact'}
                            variant={'text'}
                        >
                            <Icon type={'close'}/>
                        </Button>
                    </Link>
                </FormTitle>
                <FormFields>
                    <input
                        name={'csrfToken'}
                        required
                        type={'hidden'}
                        value={csrfToken}
                    />
                    <Input
                        autoFocus
                        label={'Username'}
                        name={'login'}
                        required
                        type={'text'}
                    />
                    <Input
                        label={'Password'}
                        name={'password'}
                        required
                        type={'password'}
                    />
                </FormFields>
                <FormActions>
                    <Link href={'/auth/sign-up'}>
                        <Button
                            as={'a'}
                            color={'secondary'}
                            variant={'outlined'}
                        >
                            {'Sign Up'}
                        </Button>
                    </Link>
                    <Button type={'submit'}>
                        {'Sign In'}
                    </Button>
                </FormActions>
            </Form>
        </AuthFormContainer>
    </>
);

export default SignIn;

export const getServerSideProps = unauthenticated<Props>(async (context) => {
    const csrfToken = await getCsrfToken(context);

    return {
        props: {
            csrfToken
        }
    };
});
