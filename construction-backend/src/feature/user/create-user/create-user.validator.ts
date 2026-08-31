import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { UserCategory } from "src/domain/user/enum/user-category.enum";
import { Transform } from 'class-transformer';

export class CreateUserBodyValidator {
    @IsString()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty()
    firstname!: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsNotEmpty()
    lastname!: string;

    @IsNumber()
    @Min(0, { message: "Age cannot be less than 0" })
    @Max(120, { message: 'Age cannot exceed 120' })
    age!: number;

    @IsEnum(UserCategory)
    category!: UserCategory;
}