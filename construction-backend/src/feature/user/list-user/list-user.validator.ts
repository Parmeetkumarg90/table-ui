import { ArrayMinSize, IsArray, IsEnum, IsIn, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { UserCategory } from "src/domain/user/enum/user-category.enum";
import { plainToInstance, Transform, Type } from 'class-transformer';
import { User } from "src/domain/user/user.entity";

const validUserFields: (keyof Partial<User>)[] = [
    'firstname',
    'lastname',
    'age',
    'category',
];

export class ListUserSortFieldValidator {
    @IsString()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty()
    @IsIn(validUserFields)
    fieldname!: keyof Partial<User>;

    @IsString()
    @Transform(({ value }) =>
        typeof value === "string" ? value.trim().toUpperCase() : value
    )
    @IsNotEmpty()
    @IsEnum(["ASC", "DESC"])
    order!: "ASC" | "DESC";
}

export class ListUserParamsValidator {
    @IsOptional()
    @Type(() => Number)
    limit: number = 10;

    @IsOptional()
    @Type(() => Number)
    page: number = 1;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty()
    search?: string;

    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            try {
                const parsed = JSON.parse(value);
                return Array.isArray(parsed) ? parsed : [parsed];
            } catch {
                return value.includes(',') ? value.split(',').map((s: string) => s.trim()) : [value.trim()];
            }
        }
        if (!Array.isArray(value) && typeof value === 'object' && value !== null) {
            return Object.values(value);
        }
        if (!Array.isArray(value) && value) {
            return [value];
        }
        return value;
    })
    @IsArray()
    @IsEnum(UserCategory, { each: true })
    categories?: UserCategory[];

    @IsOptional()
    @Transform(({ value }) => {
        let items = value;
        if (typeof value === 'string') {
            try {
                items = JSON.parse(value);
            } catch {
                try {
                    const normalized = value
                        .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
                        .replace(/:\s*([a-zA-Z0-9_]+)(\s*[,}])/g, ':"$1"$2');
                    items = JSON.parse(normalized);
                } catch {
                    return value;
                }
            }
        }
        if (!Array.isArray(items) && typeof items === 'object' && items !== null) {
            items = Object.values(items);
        }
        if (Array.isArray(items)) {
            return items.map((item) =>
                item instanceof ListUserSortFieldValidator
                    ? item
                    : plainToInstance(ListUserSortFieldValidator, item)
            );
        }
        return items;
    })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => ListUserSortFieldValidator)
    sort?: ListUserSortFieldValidator[];
}