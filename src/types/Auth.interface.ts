export interface LoginDTO {
  username: string | null;
  password: string | null;
  readonly client_id?: number;
  readonly client_secret?: string;
  readonly grant_type?: string;
  readonly push_client_id?: string;
  readonly type?: string;
}

export interface AuthDTO {
  readonly access_token: string;
  readonly expires_in: number;
  readonly refresh_token: string;
  readonly token_type: string;
}
