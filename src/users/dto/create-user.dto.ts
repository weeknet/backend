export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly displayName: string;
  readonly imageUrl: string;
  readonly type: string;
}
