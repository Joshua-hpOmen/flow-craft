export const  getAppURL = (path: string) => {
    const appURL = process.env.NEXT_PUBLIC_APP_URL
    return `${appURL}/${path}`
}