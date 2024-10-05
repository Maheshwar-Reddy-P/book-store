import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserProfileComponent } from 'src/app/views/user-profile/user-profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    items!: MenuItem[];
    isLoggedIn: boolean = false;
    @ViewChild(UserProfileComponent) userProfileComponent!: UserProfileComponent;

    constructor (private _authService: AuthenticationService) {

    }

    ngOnInit() {
        this._authService.isLoggedIn$.subscribe( res => {
            this.isLoggedIn = this._authService.isLoggedIn();
            this.items = [
                // {
                //     label:'Home',
                //     icon:'pi pi-fw pi-home',
                //     routerLink:"home"
                // },
                // {
                //     label:'Edit',
                //     icon:'pi pi-fw pi-pencil',
                //     items:[
                //         {
                //             label:'Left',
                //             icon:'pi pi-fw pi-align-left'
                //         },
                //         {
                //             label:'Right',
                //             icon:'pi pi-fw pi-align-right'
                //         },
                //         {
                //             label:'Center',
                //             icon:'pi pi-fw pi-align-center'
                //         },
                //         {
                //             label:'Justify',
                //             icon:'pi pi-fw pi-align-justify'
                //         },
    
                //     ]
                // },
                // {
                //     label:'Users',
                //     icon:'pi pi-fw pi-user',
                //     items:[
                //         {
                //             label:'New',
                //             icon:'pi pi-fw pi-user-plus',
    
                //         },
                //         {
                //             label:'Delete',
                //             icon:'pi pi-fw pi-user-minus',
    
                //         },
                //         {
                //             label:'Search',
                //             icon:'pi pi-fw pi-users',
                //             items:[
                //             {
                //                 label:'Filter',
                //                 icon:'pi pi-fw pi-filter',
                //                 items:[
                //                     {
                //                         label:'Print',
                //                         icon:'pi pi-fw pi-print'
                //                     }
                //                 ]
                //             },
                //             {
                //                 icon:'pi pi-fw pi-bars',
                //                 label:'List'
                //             }
                //             ]
                //         }
                //     ]
                // },
                // {
                //     label:'Events',
                //     icon:'pi pi-fw pi-calendar',
                //     items:[
                //         {
                //             label:'Edit',
                //             icon:'pi pi-fw pi-pencil',
                //             items:[
                //             {
                //                 label:'Save',
                //                 icon:'pi pi-fw pi-calendar-plus'
                //             },
                //             {
                //                 label:'Delete',
                //                 icon:'pi pi-fw pi-calendar-minus'
                //             },
    
                //             ]
                //         },
                //         {
                //             label:'Archieve',
                //             icon:'pi pi-fw pi-calendar-times',
                //             items:[
                //             {
                //                 label:'Remove',
                //                 icon:'pi pi-fw pi-calendar-minus'
                //             }
                //             ]
                //         }
                //     ]
                // },
                // {
                //     label: 'Cart',
                //     icon: "pi pi-fw pi-cart"
                // },
                // {
                //     label:'Login',
                //     icon:'pi pi-fw pi-sign-in',
                //     routerLink:"login"
                // },
                // {
                //     label:'Logout',
                //     icon:'pi pi-fw pi-power-off',
                //     routerLink: "login",
                //     command: () => this.logout()
                // }
            ];
            if (this.isLoggedIn) {
                this.items.push(
                    {
                        label:'Home',
                        icon:'pi pi-fw pi-home',
                        routerLink:"home"
                    },
                    {
                        label: 'Bag',
                        icon: "pi pi-fw pi-shopping-bag",
                        routerLink: 'bag'
                    },
                    {
                        label: 'Orders',
                        icon: "pi pi-fw pi-book",
                        routerLink: 'my-orders'
                    },
                    // {
                    //     label: 'Add Book',
                    //     icon: "pi pi-fw pi-file-import",
                    //     routerLink: 'add-book'
                    // },
                    // {
                    //     label: "User Profile",
                    //     icon: 'pi pi-fw pi-user',
                    //     routerLink: '',
                    //     command: () => this.userProfile()
                    // },
                    {
                        label:'Logout',
                        icon:'pi pi-fw pi-power-off',
                        routerLink: "login",
                        command: () => this.logout()
                    }
                )
            } else {
                this.items.push(
                    {
                        label:'Login',
                        icon:'pi pi-fw pi-sign-in',
                        routerLink:"login"
                    },
                    {
                        label:'Register',
                        icon:'pi pi-fw pi-sign-in',
                        routerLink:"register"
                    }
                )
            }
        });

        
        
    }

    logout () {
        localStorage.removeItem("user_id");
        this._authService.isLoggedIn$.next(false);
    }

    userProfile() {
        this.userProfileComponent.toggleDropdown();
    }
}
