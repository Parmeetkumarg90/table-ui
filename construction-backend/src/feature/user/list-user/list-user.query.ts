import { ListUserParamsValidator } from "./list-user.validator";

export class ListUserParamQuery {
    constructor(public readonly queryParams: ListUserParamsValidator) { }
}