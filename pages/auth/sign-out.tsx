import {getCsrfToken} from 'next-auth/react';
import {useRouter} from 'next/router';
import {FunctionComponent} from 'react';
import {authenticated} from '../../lib/auth/ss-auth';
import {AuthFormContainer} from '../../lib/components/shared/auth-form-container';
import {Button} from '../../lib/design/button';
import {Form} from '../../lib/design/form';
import {FormActions} from '../../lib/design/form-actions';
import {FormFields} from '../../lib/design/form-fields';
import {FormTitle} from '../../lib/design/form-title';

type Props = {
    csrfToken: string
}

const SignOut: FunctionComponent<Props> = ({csrfToken}) => {
    const router = useRouter();

    return (
        <AuthFormContainer>
            <Form
                action={'/api/auth/signout'}
                method={'post'}
            >
                <FormTitle>
                    {'You are about to sign out.'}
                </FormTitle>
                <FormFields>
                    <input
                        name={'csrfToken'}
                        required
                        type={'hidden'}
                        value={csrfToken}
                    />
                </FormFields>
                <FormActions>
                    <Button
                        color={'secondary'}
                        onClick={() => router.back()}
                        variant={'text'}
                    >
                        {'Go back'}
                    </Button>
                    <Button type={'submit'}>
                        {'Continue'}
                    </Button>
                </FormActions>
            </Form>
        </AuthFormContainer>
    );
};

export default SignOut;

export const getServerSideProps = authenticated<Props>(async (context) => {
    const csrfToken = await getCsrfToken(context);

    return {
        props: {
            csrfToken
        }
    };
});
