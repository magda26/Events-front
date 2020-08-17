export class AuthenticationResponse {
  token: string;
  user: AuthenticatedUser;
}

export class AuthenticatedUser {
  id: number;
  username: string;
}
