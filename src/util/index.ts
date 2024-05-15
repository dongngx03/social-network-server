
export const returnMessage = (error: any) => {
    return {
        name: error.name,
        message: error.message
    }
}