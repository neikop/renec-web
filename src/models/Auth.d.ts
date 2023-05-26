type ProfileType = {
  isLoggedIn?: boolean;
  accessToken?: string;
  id?: string;
  username?: string;
};

type LoginBody = {
  username: string;
  password: string;
};

type LoginResponse = {
  id: string;
  username: string;
  accessToken: string;
};

type RegisterBody = {
  username: string;
  password: string;
  confirmPassword: string;
};

type RegisterResponse = LoginResponse;
