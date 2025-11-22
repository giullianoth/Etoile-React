export const useValidateEmail = () => {
    const validate = (email: string) => /\S+@\S+\.\S+/.test(email)
    return validate
}