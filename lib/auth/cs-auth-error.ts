import {useRouter} from 'next/router';

const errors = {
    CreateAccount: 'There was an error when creating user in the database.',
    CredentialsSignin: 'There was an error when processing the credentials.',
    SessionRequired: 'The content of this page requires you to be signed in at all times.',
    Default: 'Something went wrong please try again later.'
} as const;

export const useAuthError = () => {
    const router = useRouter();
    const error = router.query.error as keyof typeof errors;

    if (error) {
        return errors[error] || errors.Default;
    }

    return null;
};
