import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // Decodes the JWT and returns the payload
  getProfile(): JwtPayload | null {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  // Checks if the user is logged in
  loggedIn(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }

  // Checks if the token is expired
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        // `exp` is in seconds, so compare it with the current time in seconds
        return decoded.exp < Math.floor(Date.now() / 1000);
      }
      return true; // Assume expired if no `exp` field is present
    } catch (error) {
      console.error("Error decoding token", error);
      return true; // Invalid token
    }
  }

  // Retrieves the token from localStorage
  getToken(): string | null {
    return localStorage.getItem("id_token");
  }

  // Saves the token to localStorage and redirects to the home page
  login(idToken: string): void {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/"); // Redirect to the home page
  }

  // Removes the token from localStorage and redirects to the login page
  logout(): void {
    localStorage.removeItem("id_token");
    window.location.assign("/login"); // Redirect to the login page
  }
}

export default new AuthService();
