export interface User {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly displayName: string;
  readonly imageUrl: string;
  readonly type: string;
  readonly activateCode: string;
  readonly status: string;
  readonly createdAt: Date;
  readonly searchText: string;
}
