import Cookies from 'universal-cookie';

export const isSignedIn = () => {
    console.log(new Cookies().getAll(100));
    return new Cookies().get('session') !== undefined;
}

export const signOut = () => {
    new Cookies().remove('session');
}