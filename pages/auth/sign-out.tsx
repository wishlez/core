import {getCsrfToken} from 'next-auth/react';
import {useRouter} from 'next/router';
import {FunctionComponent} from 'react';
import {authenticated} from '../../lib/auth/ss-auth';
import {AuthFormContainer} from '../../lib/components/shared/auth-form-container';
import {ConfirmationForm} from '../../lib/components/shared/confirmation-form';

type Props = {
    csrfToken: string
}

const SignOut: FunctionComponent<Props> = ({csrfToken}) => {
    const router = useRouter();

    return (
        <AuthFormContainer>
            <ConfirmationForm
                action={'/api/auth/signout'}
                method={'post'}
                onReset={() => router.back()}
                title={'You are about to sign out'}
                token={csrfToken}
            />
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
