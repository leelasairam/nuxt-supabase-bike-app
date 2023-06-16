export const useGetuser = () => {
    const SendUserInfo = () => {
        const user = useSupabaseUser();
        return user.value;
    }
    return { SendUserInfo };
}
