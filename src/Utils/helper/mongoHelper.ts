import {Types} from "mongoose";

type _TPayload = {
    [key: string]: string | Types.ObjectId
}
type TConvertObjectIdResponse = {
    [key: string]: Types.ObjectId
}
const convertToObjectId = (data: _TPayload): TConvertObjectIdResponse => {
    let modifyPayload: any = {}
    Object.entries(data).map(([key, value]) => {
        modifyPayload[key] = new Types.ObjectId(value)
    })
    return modifyPayload
}
export const MongoHelper = {
    convertToObjectId
}