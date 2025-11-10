import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PwnedPasswordCheckerService {
  private readonly http = inject(HttpClient);

  sha1(password: string): string {
    return CryptoJS.SHA1(password).toString(CryptoJS.enc.Hex).toUpperCase();
  }

  getHashPrefix(hash: string): string {
    return hash.slice(0, 5);
  }

  getHashSuffix(hash: string): string {
    return hash.slice(5);
  }

  queryPwnedPasswordsAPI(prefix: string): Observable<string> {
    return this.http.get(`https://api.pwnedpasswords.com/range/${prefix}`, {
      responseType: 'text', // Expect plain text response
    });
  }

  isPasswordPwned(suffix: string, response: string): boolean {
    const hashes = response.split('\n'); // Split response by new lines
    return hashes.some((hash) => hash.startsWith(suffix)); // Check for matching suffix
  }

  checkPassword(password: string): Observable<boolean | 'error'> {
    if (!password) return of(false); // Return false for empty passwords

    const sha1Hash = this.sha1(password); // Generate SHA-1 hash
    const prefix = this.getHashPrefix(sha1Hash); // Extract prefix
    const suffix = this.getHashSuffix(sha1Hash); // Extract suffix

    return this.queryPwnedPasswordsAPI(prefix).pipe(
      map((response: string) => this.isPasswordPwned(suffix, response)), // Map API response to boolean
      catchError(() => of<'error'>('error')) // Handle errors
    );
  }
}
