export default interface LoginDTO {
  username: string | null;
  password: string | null;
  readonly client_id?: number;
  readonly client_secret?: string;
  readonly grant_type?: string;
  readonly push_client_id?: string;
  readonly type?: string;
}
