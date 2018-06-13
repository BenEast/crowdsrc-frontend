import { Injectable } from '@angular/core';
import { ConstantService } from 'app/services/constant.service';
import { Http, Headers } from '@angular/http';
import { AuthenticationService } from 'app/services/authentication.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ImageService {
    private images_sm: Map<string, string> = new Map<string, string>();
    private images_md: Map<string, string> = new Map<string, string>();
    private images: Map<string, string> = new Map<string, string>();

    constructor(private _authService: AuthenticationService, private _constantService: ConstantService, private _http: Http) { }

    getUserImage(username: string, size?: string): Observable<string> {
        return new Observable<string>((observer) => {
            if (size === 'sm' && this.images_sm.has(username)) {
                observer.next(this.images_sm.get(username));
                observer.complete();
            } else if (size === 'md' && this.images_md.has(username)) {
                observer.next(this.images_md.get(username));
                observer.complete();
            } else if (!size && this.images.has(username)) {
                observer.next(this.images.get(username));
                observer.complete();
            } else {
                const size_param = ['sm', 'md'].includes(size) ? '?size=' + size : '';
                this._http.get(this._constantService.getUsersUrl() + username + '/image/' + size_param,
                    this._authService.getHeaders()).subscribe(
                        image => {
                            const data = image.json();

                            if (size === 'sm') {
                                this.images_sm.set(username, data);
                            } else if (size === 'md') {
                                this.images_md.set(username, data);
                            } else {
                                this.images.set(username, data);
                            }
                            observer.next(data);
                            observer.complete();

                            // Make images expire after 15 minutes
                            setTimeout(() => this.expireImages(username), 900000);
                        },
                        error => {
                            observer.error(error);
                            observer.complete();
                        }
                    );
            }
        });
    }

    updateUserImage(username: string, file: string): Observable<string> {
        return new Observable<string>((observer) => {
            this._http.patch(this._constantService.getUsersUrl() + username + '/image/', JSON.stringify({ 'image': file }),
                this._authService.getHeaders()).subscribe(
                    success => {
                        this.expireImages(username);

                        this.images.set(username, file);
                        observer.next(file);
                        observer.complete();
                    },
                    error => {
                        observer.error(error);
                        observer.complete();
                    });
        });
    }

    private expireImages(username: string) {
        this.images_sm.delete(username);
        this.images_md.delete(username);
        this.images.delete(username);
    }
}
