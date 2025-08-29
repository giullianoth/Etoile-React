export const useFirstName = () => {
    const firstName = (fullname: string) => fullname.split(" ")[0]
    return firstName
}