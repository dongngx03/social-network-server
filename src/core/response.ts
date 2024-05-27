
const responseCustom = (success: true | false, message: string, data: any) => {
    return {
        success: success,
        message: message,
        data: data
    }
}

export default responseCustom
