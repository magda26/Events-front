export class AuthenticationResponse {
  key: string;
  user: AuthenticatedUser;
}

export class AuthenticatedUser {
  id: number;
  username: string;
}
