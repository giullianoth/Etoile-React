export const useValidateEmail = () => {
    const validateEmail = (email: string) => {
        const characters = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return characters.test(email)
    }

    return validateEmail
}